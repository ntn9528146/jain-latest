// LocalStorage based Mock Store for Single-Use Authorization Codes
const INVITE_STORAGE_KEY = 'paperpilot_invite_codes';

export function getAllInviteCodes() {
  const codes = localStorage.getItem(INVITE_STORAGE_KEY);
  return codes ? JSON.parse(codes) : [
    // Pre-seeded Master Code for Testing
    {
      code: "APS-DEV-7788",
      schoolId: "SCH_001",
      schoolName: "Arden Progressive School",
      assignedRole: "TEACHER",
      department: "Computer Science",
      createdDate: "2026-09-03",
      isUsed: false,
      usedBy: null
    },
    {
      code: "APS-PRIN-9900",
      schoolId: "SCH_001",
      schoolName: "Arden Progressive School",
      assignedRole: "PRINCIPAL",
      department: "Academic Office",
      createdDate: "2026-09-03",
      isUsed: false,
      usedBy: null
    }
  ];
}

export function generateSecretCode({ schoolId, schoolName, assignedRole, department, generatedBy }) {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const rolePrefix = assignedRole.substring(0, 4);
  const newCodeStr = `${schoolId.split('_')[0]}-${rolePrefix}-${randomPart}`;

  const newCodeObj = {
    code: newCodeStr,
    schoolId,
    schoolName,
    assignedRole,
    department: department || "General",
    createdDate: new Date().toISOString().split('T')[0],
    generatedBy,
    isUsed: false,
    usedBy: null
  };

  const currentCodes = getAllInviteCodes();
  currentCodes.push(newCodeObj);
  localStorage.setItem(INVITE_STORAGE_KEY, JSON.stringify(currentCodes));

  return newCodeObj;
}

export function verifyAndConsumeCode(inputCode, userEmail) {
  const codes = getAllInviteCodes();
  const index = codes.findIndex((c) => c.code.trim().toUpperCase() === inputCode.trim().toUpperCase());

  if (index === -1) {
    return { success: false, message: "Invalid authorization secret code." };
  }

  if (codes[index].isUsed) {
    return { success: false, message: "This secret code has already been redeemed by another faculty." };
  }

  // Mark code as consumed permanently
  codes[index].isUsed = true;
  codes[index].usedBy = userEmail;
  codes[index].usedAt = new Date().toISOString();
  localStorage.setItem(INVITE_STORAGE_KEY, JSON.stringify(codes));

  return { 
    success: true, 
    data: codes[index] 
  };
}

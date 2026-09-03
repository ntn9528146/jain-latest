import { ROLES, HIERARCHY_RANK } from '../config/rbacRules.js';

const AUTH_DB_KEY = 'paperpilot_master_accounts';
const SCHOOLS_DB_KEY = 'paperpilot_schools_db';

export const INITIAL_SCHOOLS = [
  { id: "SCH_001", name: "Arden Progressive School", city: "Haldwani", status: "Active", suspendReason: "", plan: "Enterprise 2026-27" },
  { id: "SCH_002", name: "Delhi Public School", city: "Nainital", status: "Active", suspendReason: "", plan: "Standard Plan" }
];

export const INITIAL_USERS = [
  {
    id: "usr_dev",
    fullName: "Nitin Tripathi (System Architect)",
    email: "developer@paperpilot.io",
    password: "DevMaster@2026",
    role: ROLES.DEVELOPER,
    schoolId: "ALL",
    schoolName: "PaperPilot Platform Host",
    department: "Engineering & Architecture",
    phone: "+91 9876543210",
    status: "Active"
  },
  {
    id: "usr_prin",
    fullName: "Dr. R. K. Sharma",
    email: "principal@arden.edu",
    password: "Principal@123",
    role: ROLES.PRINCIPAL,
    schoolId: "SCH_001",
    schoolName: "Arden Progressive School",
    department: "Administration",
    phone: "+91 9412000001",
    status: "Active"
  },
  {
    id: "usr_tch",
    fullName: "Alok Verma",
    email: "alok.cs@arden.edu",
    password: "Faculty@123",
    role: ROLES.TEACHER,
    schoolId: "SCH_001",
    schoolName: "Arden Progressive School",
    department: "Computer Science",
    phone: "+91 9412000002",
    status: "Active"
  }
];

export function getSchools() {
  const data = localStorage.getItem(SCHOOLS_DB_KEY);
  if (!data) {
    localStorage.setItem(SCHOOLS_DB_KEY, JSON.stringify(INITIAL_SCHOOLS));
    return INITIAL_SCHOOLS;
  }
  return JSON.parse(data);
}

export function saveSchools(schools) {
  localStorage.setItem(SCHOOLS_DB_KEY, JSON.stringify(schools));
}

export function getUsers() {
  const data = localStorage.getItem(AUTH_DB_KEY);
  if (!data) {
    localStorage.setItem(AUTH_DB_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(data);
}

export function saveUsers(users) {
  localStorage.setItem(AUTH_DB_KEY, JSON.stringify(users));
}

export function registerUserWithCode(newUserData) {
  const users = getUsers();
  users.push({
    id: "usr_" + Date.now(),
    status: "Active",
    ...newUserData
  });
  saveUsers(users);
}

export function canManageTarget(actorRole, targetRole) {
  return HIERARCHY_RANK[actorRole] > HIERARCHY_RANK[targetRole];
}

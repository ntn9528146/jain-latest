const STATS_KEY = 'paperpilot_paper_stats';

export function getFacultyPaperStats(facultyId) {
  const data = localStorage.getItem(STATS_KEY);
  const allStats = data ? JSON.parse(data) : {};
  return allStats[facultyId] || {
    totalTheoryPapers: 0,
    totalPracticalPapers: 0,
    bySubject: {}
  };
}

export function incrementPaperCount(facultyId, subject, isPractical = false) {
  const data = localStorage.getItem(STATS_KEY);
  const allStats = data ? JSON.parse(data) : {};
  const current = allStats[facultyId] || {
    totalTheoryPapers: 0,
    totalPracticalPapers: 0,
    bySubject: {}
  };

  if (isPractical) {
    current.totalPracticalPapers += 1;
  } else {
    current.totalTheoryPapers += 1;
  }

  if (!current.bySubject[subject]) {
    current.bySubject[subject] = { theory: 0, practical: 0 };
  }

  if (isPractical) {
    current.bySubject[subject].practical += 1;
  } else {
    current.bySubject[subject].theory += 1;
  }

  allStats[facultyId] = current;
  localStorage.setItem(STATS_KEY, JSON.stringify(allStats));
  return current;
}

import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = [
  {
    id: 1,
    email: 'student@lonu.edu',
    password: 'student123',
    firstName: 'Grace',
    lastName: 'Okafor',
    studentId: 'LNU-2024-001',
    program: 'Bachelor of Divinity',
    year: 2,
    gpa: '3.75',
    enrolledCourses: [
      'cert-biblical-studies',
      'deg-bachelor-divinity',
    ],
    grades: [
      { code: 'BIB101', title: 'Introduction to the Bible', grade: 'A', credits: 3, semester: 'Fall 2024' },
      { code: 'THE101', title: 'Christian Theology I', grade: 'A-', credits: 3, semester: 'Fall 2024' },
      { code: 'CHR201', title: 'Church History I', grade: 'B+', credits: 3, semester: 'Fall 2024' },
      { code: 'GRK101', title: 'New Testament Greek I', grade: 'B', credits: 3, semester: 'Spring 2025' },
      { code: 'HEB101', title: 'Biblical Hebrew I', grade: 'B+', credits: 3, semester: 'Spring 2025' },
      { code: 'MIN401', title: 'Preaching and Homiletics', grade: 'A', credits: 3, semester: 'Spring 2025' },
    ],
  },
];

const ENROLLED_KEY = 'lonu_enrolled';
const USER_KEY = 'lonu_user';

function getEnrolled() {
  try {
    return JSON.parse(localStorage.getItem(ENROLLED_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch {
      return null;
    }
  });

  const [enrolled, setEnrolled] = useState(getEnrolled);

  const login = useCallback((email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const { password: _pw, ...safe } = found;
      setUser(safe);
      localStorage.setItem(USER_KEY, JSON.stringify(safe));
      const savedEnrolled = getEnrolled();
      const merged = Array.from(new Set([...safe.enrolledCourses, ...savedEnrolled]));
      setEnrolled(merged);
      localStorage.setItem(ENROLLED_KEY, JSON.stringify(merged));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  }, []);

  const register = useCallback((data) => {
    const newUser = {
      id: Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      studentId: `LNU-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      program: 'Undeclared',
      year: 1,
      gpa: 'N/A',
      enrolledCourses: [],
      grades: [],
    };
    setUser(newUser);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setEnrolled([]);
    localStorage.setItem(ENROLLED_KEY, JSON.stringify([]));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ENROLLED_KEY);
    setEnrolled([]);
  }, []);

  const enroll = useCallback((programId) => {
    setEnrolled((prev) => {
      if (prev.includes(programId)) return prev;
      const next = [...prev, programId];
      localStorage.setItem(ENROLLED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const unenroll = useCallback((programId) => {
    setEnrolled((prev) => {
      const next = prev.filter((id) => id !== programId);
      localStorage.setItem(ENROLLED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isEnrolled = useCallback(
    (programId) => enrolled.includes(programId),
    [enrolled]
  );

  return (
    <AuthContext.Provider value={{ user, login, register, logout, enroll, unenroll, isEnrolled, enrolled }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

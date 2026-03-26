import { useAuth } from '../context/AuthContext';
import './Grades.css';

const GRADE_POINTS = {
  A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0,
  'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7,
  D: 1.0, F: 0.0,
};

function gradeColor(grade) {
  if (grade.startsWith('A')) return 'grade-a';
  if (grade.startsWith('B')) return 'grade-b';
  if (grade.startsWith('C')) return 'grade-c';
  return 'grade-d';
}

function computeGPA(grades) {
  if (!grades || grades.length === 0) return 'N/A';
  let totalPoints = 0;
  let totalCredits = 0;
  grades.forEach((g) => {
    const pts = GRADE_POINTS[g.grade];
    if (pts !== undefined) {
      totalPoints += pts * g.credits;
      totalCredits += g.credits;
    }
  });
  if (totalCredits === 0) return 'N/A';
  return (totalPoints / totalCredits).toFixed(2);
}

export default function Grades() {
  const { user } = useAuth();
  const grades = user.grades || [];

  const bySemester = grades.reduce((acc, g) => {
    if (!acc[g.semester]) acc[g.semester] = [];
    acc[g.semester].push(g);
    return acc;
  }, {});

  const semesters = Object.keys(bySemester).reverse();
  const gpa = computeGPA(grades);
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);

  return (
    <div className="grades-page">
      <div className="grades-inner">
        <div className="page-header">
          <h1>Academic Transcript</h1>
          <p>Your complete academic record at Lonu University.</p>
        </div>

        {/* Summary */}
        <div className="grades-summary">
          <div className="summary-card">
            <div className="summary-value">{gpa}</div>
            <div className="summary-label">Cumulative GPA</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{totalCredits}</div>
            <div className="summary-label">Credits Earned</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{grades.length}</div>
            <div className="summary-label">Courses Completed</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{semesters.length}</div>
            <div className="summary-label">Semesters Attended</div>
          </div>
        </div>

        {grades.length === 0 ? (
          <div className="empty-state">
            <p>No grades have been recorded yet.</p>
          </div>
        ) : (
          semesters.map((semester) => {
            const semGrades = bySemester[semester];
            const semGPA = computeGPA(semGrades);
            const semCredits = semGrades.reduce((s, g) => s + g.credits, 0);
            return (
              <section key={semester} className="semester-section">
                <div className="semester-header">
                  <h2>{semester}</h2>
                  <div className="semester-summary">
                    <span>Credits: <strong>{semCredits}</strong></span>
                    <span>GPA: <strong>{semGPA}</strong></span>
                  </div>
                </div>
                <div className="grades-table">
                  <div className="grades-table-header">
                    <span>Code</span>
                    <span>Course Title</span>
                    <span>Credits</span>
                    <span>Grade</span>
                    <span>Points</span>
                  </div>
                  {semGrades.map((g) => (
                    <div key={g.code} className="grades-row">
                      <span className="g-code">{g.code}</span>
                      <span className="g-title">{g.title}</span>
                      <span className="g-credits">{g.credits}</span>
                      <span className={`grade-badge ${gradeColor(g.grade)}`}>{g.grade}</span>
                      <span className="g-points">
                        {GRADE_POINTS[g.grade] !== undefined
                          ? (GRADE_POINTS[g.grade] * g.credits).toFixed(1)
                          : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}

        <div className="transcript-footer">
          <p>
            ✝ &ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not
            for human masters.&rdquo; — Colossians 3:23
          </p>
          <p className="transcript-note">
            This transcript is for informational purposes only. Official transcripts must be
            requested through the Registrar&rsquo;s Office.
          </p>
        </div>
      </div>
    </div>
  );
}

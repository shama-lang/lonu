import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { programs, getProgram } from '../data/courses';
import './Dashboard.css';

const GRADE_POINTS = { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0 };

function gradeColor(grade) {
  if (grade.startsWith('A')) return 'grade-a';
  if (grade.startsWith('B')) return 'grade-b';
  return 'grade-c';
}

export default function Dashboard() {
  const { user, enrolled } = useAuth();

  const recentGrades = (user.grades || []).slice(-3).reverse();

  const enrolledPrograms = enrolled
    .map(getProgram)
    .filter(Boolean);

  const completedCredits = (user.grades || []).reduce((sum, g) => sum + g.credits, 0);

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">
        {/* Welcome */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1>
              Welcome back, {user.firstName}!{' '}
              <span className="welcome-cross">✝</span>
            </h1>
            <p>
              &ldquo;I can do all things through Christ who strengthens me.&rdquo; — Philippians 4:13
            </p>
          </div>
          <div className="welcome-meta">
            <span className="student-id-badge">ID: {user.studentId}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <div className="dash-stat-value">{enrolledPrograms.length}</div>
            <div className="dash-stat-label">Enrolled Programs</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-value">{completedCredits}</div>
            <div className="dash-stat-label">Credits Completed</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-value">{user.gpa}</div>
            <div className="dash-stat-label">Cumulative GPA</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-value">Year {user.year}</div>
            <div className="dash-stat-label">Academic Year</div>
          </div>
        </div>

        <div className="dash-grid">
          {/* Enrolled Programs */}
          <section className="dash-card">
            <div className="dash-card-header">
              <h2>My Programs</h2>
              <Link to="/my-courses" className="dash-link">View all →</Link>
            </div>
            {enrolledPrograms.length === 0 ? (
              <div className="dash-empty">
                <p>You are not enrolled in any programs yet.</p>
                <Link to="/courses" className="btn btn-primary">Browse Programs</Link>
              </div>
            ) : (
              <ul className="dash-program-list">
                {enrolledPrograms.map((p) => (
                  <li key={p.id}>
                    <Link to={`/courses/${p.id}`} className="dash-program-item">
                      <div>
                        <span className={`type-badge ${p.type}`}>
                          {p.type === 'certificate' ? 'Certificate' : p.level}
                        </span>
                        <strong>{p.title}</strong>
                      </div>
                      <span className="dash-program-meta">{p.duration} · {p.credits} cr</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent Grades */}
          <section className="dash-card">
            <div className="dash-card-header">
              <h2>Recent Grades</h2>
              <Link to="/grades" className="dash-link">View all →</Link>
            </div>
            {recentGrades.length === 0 ? (
              <div className="dash-empty">
                <p>No grades recorded yet.</p>
              </div>
            ) : (
              <ul className="dash-grades-list">
                {recentGrades.map((g) => (
                  <li key={g.code} className="dash-grade-item">
                    <div className="grade-course-info">
                      <span className="grade-code">{g.code}</span>
                      <span className="grade-title">{g.title}</span>
                    </div>
                    <span className={`grade-badge ${gradeColor(g.grade)}`}>{g.grade}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Quick Actions */}
          <section className="dash-card">
            <div className="dash-card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <Link to="/courses" className="quick-action">
                <span className="qa-icon">📚</span>
                <span>Browse Programs</span>
              </Link>
              <Link to="/my-courses" className="quick-action">
                <span className="qa-icon">📋</span>
                <span>My Courses</span>
              </Link>
              <Link to="/grades" className="quick-action">
                <span className="qa-icon">📊</span>
                <span>View Grades</span>
              </Link>
              <Link to="/profile" className="quick-action">
                <span className="qa-icon">👤</span>
                <span>My Profile</span>
              </Link>
            </div>
          </section>

          {/* Upcoming */}
          <section className="dash-card">
            <div className="dash-card-header">
              <h2>Available Programs</h2>
              <Link to="/courses" className="dash-link">Explore →</Link>
            </div>
            <ul className="dash-available-list">
              {programs.certificates.slice(0, 2).map((p) => (
                <li key={p.id}>
                  <Link to={`/courses/${p.id}`} className="dash-available-item">
                    <span className="type-badge certificate">Certificate</span>
                    <span>{p.title}</span>
                  </Link>
                </li>
              ))}
              {programs.degrees.slice(0, 2).map((p) => (
                <li key={p.id}>
                  <Link to={`/courses/${p.id}`} className="dash-available-item">
                    <span className={`type-badge ${p.type}`}>{p.level}</span>
                    <span>{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

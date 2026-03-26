import { useParams, Link } from 'react-router-dom';
import { getProgram } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import './CourseDetail.css';

export default function CourseDetail() {
  const { id } = useParams();
  const program = getProgram(id);
  const { user, isEnrolled, enroll, unenroll } = useAuth();

  if (!program) {
    return (
      <div className="not-found-page">
        <h1>Program Not Found</h1>
        <p>The program you are looking for does not exist.</p>
        <Link to="/courses" className="btn btn-primary">Back to Programs</Link>
      </div>
    );
  }

  const enrolled = isEnrolled(program.id);

  function handleEnroll() {
    if (enrolled) {
      unenroll(program.id);
    } else {
      enroll(program.id);
    }
  }

  return (
    <div className="course-detail-page">
      <div className="course-detail-inner">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/courses">Programs</Link>
          <span>/</span>
          <span>{program.title}</span>
        </nav>

        <div className="course-detail-grid">
          {/* Main */}
          <div className="course-detail-main">
            <div className="detail-type-badge">
              <span className={`type-pill ${program.type}`}>
                {program.type === 'certificate' ? 'Certificate Program' : `${program.level} Degree`}
              </span>
              <span className="detail-dept">{program.department}</span>
            </div>
            <h1>{program.title}</h1>
            <p className="detail-description">{program.description}</p>

            {/* Course List */}
            <section className="detail-section">
              <h2>Course Curriculum</h2>
              <p className="curriculum-note">
                {program.courses.length} courses · {program.credits} total credits
              </p>
              <div className="curriculum-table">
                <div className="curriculum-header">
                  <span>Code</span>
                  <span>Course Title</span>
                  <span>Credits</span>
                </div>
                {program.courses.map((c, i) => (
                  <div key={c.code} className={`curriculum-row ${i % 2 === 0 ? 'even' : ''}`}>
                    <span className="course-code">{c.code}</span>
                    <span className="course-title">{c.title}</span>
                    <span className="course-credits">{c.credits}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="course-detail-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-meta">
                <div className="meta-item">
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{program.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Total Credits</span>
                  <span className="meta-value">{program.credits}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Courses</span>
                  <span className="meta-value">{program.courses.length}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Department</span>
                  <span className="meta-value">{program.department}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Program Type</span>
                  <span className="meta-value">
                    {program.type === 'certificate' ? 'Certificate' : `${program.level} Degree`}
                  </span>
                </div>
              </div>

              {user ? (
                <button
                  className={`enroll-btn ${enrolled ? 'enrolled' : ''}`}
                  onClick={handleEnroll}
                >
                  {enrolled ? '✓ Enrolled — Withdraw' : 'Enroll in This Program'}
                </button>
              ) : (
                <Link to="/login" className="enroll-btn">
                  Sign In to Enroll
                </Link>
              )}

              {enrolled && (
                <div className="enrolled-notice">
                  <span>✝</span>
                  <p>You are enrolled in this program. Visit <Link to="/my-courses">My Courses</Link> to view your curriculum.</p>
                </div>
              )}
            </div>

            <div className="sidebar-verse">
              <p>
                &ldquo;Commit to the LORD whatever you do, and he will establish your plans.&rdquo;
              </p>
              <cite>— Proverbs 16:3</cite>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

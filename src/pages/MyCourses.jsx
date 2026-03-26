import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProgram } from '../data/courses';
import './MyCourses.css';

export default function MyCourses() {
  const { enrolled, unenroll } = useAuth();

  const enrolledPrograms = enrolled.map(getProgram).filter(Boolean);

  const certificates = enrolledPrograms.filter((p) => p.type === 'certificate');
  const degrees = enrolledPrograms.filter((p) => p.type === 'degree');

  return (
    <div className="my-courses-page">
      <div className="my-courses-inner">
        <div className="page-header">
          <h1>My Courses</h1>
          <p>Your enrolled programs and their curricula.</p>
        </div>

        {enrolledPrograms.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h2>No Programs Enrolled</h2>
            <p>You have not enrolled in any programs yet. Browse our catalog to get started.</p>
            <Link to="/courses" className="btn btn-primary">Browse Programs</Link>
          </div>
        ) : (
          <>
            {certificates.length > 0 && (
              <section className="my-section">
                <h2 className="my-section-title">
                  <span className="section-dot certificate" />
                  Certificate Programs
                </h2>
                <div className="my-programs-grid">
                  {certificates.map((p) => (
                    <ProgramCard key={p.id} program={p} onUnenroll={unenroll} />
                  ))}
                </div>
              </section>
            )}

            {degrees.length > 0 && (
              <section className="my-section">
                <h2 className="my-section-title">
                  <span className="section-dot degree" />
                  Degree Programs
                </h2>
                <div className="my-programs-grid">
                  {degrees.map((p) => (
                    <ProgramCard key={p.id} program={p} onUnenroll={unenroll} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProgramCard({ program, onUnenroll }) {
  return (
    <div className="my-program-card">
      <div className="my-program-header">
        <div>
          <span className={`type-pill ${program.type}`}>
            {program.type === 'certificate' ? 'Certificate' : `${program.level} Degree`}
          </span>
          <h3>{program.title}</h3>
          <p className="my-program-dept">{program.department}</p>
        </div>
        <div className="my-program-actions">
          <Link to={`/courses/${program.id}`} className="view-btn">View</Link>
          <button className="unenroll-btn" onClick={() => onUnenroll(program.id)}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="my-program-meta">
        <span>⏱ {program.duration}</span>
        <span>📚 {program.credits} credits</span>
        <span>📖 {program.courses.length} courses</span>
      </div>

      <div className="course-list-section">
        <h4>Curriculum</h4>
        <div className="course-chips">
          {program.courses.slice(0, 6).map((c) => (
            <span key={c.code} className="course-chip">
              <span className="chip-code">{c.code}</span>
              <span className="chip-title">{c.title}</span>
            </span>
          ))}
          {program.courses.length > 6 && (
            <span className="course-chip more-chip">
              +{program.courses.length - 6} more courses
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

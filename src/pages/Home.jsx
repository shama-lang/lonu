import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { programs } from '../data/courses';
import './Home.css';

const STATS = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '30+', label: 'Expert Faculty' },
  { value: '9', label: 'Programs Offered' },
  { value: '15+', label: 'Years of Excellence' },
];

const VALUES = [
  {
    icon: '✝',
    title: 'Faith-Centered',
    desc: 'Every course is grounded in biblical truth and Christian worldview, integrating faith and learning.',
  },
  {
    icon: '📖',
    title: 'Academic Excellence',
    desc: 'Rigorous scholarship that challenges students to think deeply and engage critically with Scripture.',
  },
  {
    icon: '🌍',
    title: 'Kingdom Impact',
    desc: 'Equipping graduates to serve in churches, missions, and communities around the world.',
  },
  {
    icon: '🤝',
    title: 'Community',
    desc: 'A welcoming family of believers committed to mutual growth and encouragement in Christ.',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-cross">✝</div>
          <h1 className="hero-title">
            Transforming Lives Through<br />
            <span className="hero-highlight">Faith &amp; Knowledge</span>
          </h1>
          <p className="hero-subtitle">
            Lonu University is a Christian higher education institution offering certificate
            and degree programs that equip students for ministry, service, and scholarly excellence.
          </p>
          <div className="hero-cta">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Apply Now
                </Link>
                <Link to="/courses" className="btn btn-outline btn-lg">
                  View Programs
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-verse">
          <blockquote>
            &ldquo;Study to shew thyself approved unto God, a workman that needeth not to be
            ashamed, rightly dividing the word of truth.&rdquo;
          </blockquote>
          <cite>— 2 Timothy 2:15</cite>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Programs Overview */}
      <section className="section programs-section">
        <div className="section-header">
          <h2>Our Programs</h2>
          <p>Choose from our certificate and degree programs designed to deepen your faith and sharpen your skills.</p>
        </div>

        <div className="programs-grid">
          <div className="program-category">
            <div className="category-badge certificate">Certificate Programs</div>
            <ul className="program-list">
              {programs.certificates.map((p) => (
                <li key={p.id}>
                  <Link to={`/courses/${p.id}`} className="program-link">
                    <span>{p.title}</span>
                    <span className="program-meta">{p.duration} · {p.credits} credits</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/courses?type=certificate" className="see-all-link">
              View all certificate programs →
            </Link>
          </div>

          <div className="program-category">
            <div className="category-badge degree">Degree Programs</div>
            <ul className="program-list">
              {programs.degrees.map((p) => (
                <li key={p.id}>
                  <Link to={`/courses/${p.id}`} className="program-link">
                    <span>{p.level} of {p.title.replace(p.level + ' of ', '').replace(p.level + ' ', '')}</span>
                    <span className="program-meta">{p.duration} · {p.credits} credits</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/courses?type=degree" className="see-all-link">
              View all degree programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section values-section">
        <div className="section-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do at Lonu University.</p>
        </div>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Begin Your Journey in Faith &amp; Learning</h2>
          <p>Join a community of believers committed to academic excellence and Kingdom service.</p>
          <div className="hero-cta">
            {user ? (
              <Link to="/courses" className="btn btn-primary btn-lg">
                Explore Programs
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Apply Today
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg btn-outline-light">
                  Student Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

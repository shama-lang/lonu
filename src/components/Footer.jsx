import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-cross">✝</span>
          <span className="footer-name">Lonu University</span>
          <p className="footer-tagline">Transforming Lives Through Faith and Knowledge</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Programs</h4>
            <Link to="/courses?type=certificate">Certificates</Link>
            <Link to="/courses?type=degree">Degrees</Link>
          </div>
          <div className="footer-col">
            <h4>Student Life</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/grades">Grades</Link>
          </div>
          <div className="footer-col">
            <h4>Institution</h4>
            <a href="#about">About Us</a>
            <a href="#mission">Our Mission</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Lonu University &mdash; A Christian Higher Education Institution.
          All rights reserved.
        </p>
        <p className="footer-verse">
          &ldquo;The fear of the LORD is the beginning of wisdom.&rdquo; &mdash; Proverbs 9:10
        </p>
      </div>
    </footer>
  );
}

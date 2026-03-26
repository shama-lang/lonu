import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { programs } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import './Courses.css';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type') || 'all';
  const [search, setSearch] = useState('');
  const { isEnrolled } = useAuth();

  const allPrograms = [...programs.certificates, ...programs.degrees];

  const filtered = allPrograms.filter((p) => {
    const matchType =
      typeFilter === 'all' ||
      (typeFilter === 'certificate' && p.type === 'certificate') ||
      (typeFilter === 'degree' && p.type === 'degree');
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="courses-page">
      <div className="courses-inner">
        {/* Page Header */}
        <div className="page-header">
          <h1>Academic Programs</h1>
          <p>
            Explore our certificate and degree programs designed to equip you for ministry,
            scholarship, and Christ-centered service.
          </p>
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="filter-tabs">
            {['all', 'certificate', 'degree'].map((t) => (
              <button
                key={t}
                className={`filter-tab ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setSearchParams(t === 'all' ? {} : { type: t })}
              >
                {t === 'all' ? 'All Programs' : t === 'certificate' ? 'Certificates' : 'Degrees'}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="courses-search"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Results */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'program' : 'programs'}
        </p>

        <div className="courses-grid">
          {filtered.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card-header">
                <span className={`type-pill ${program.type}`}>
                  {program.type === 'certificate' ? 'Certificate' : `${program.level} Degree`}
                </span>
                {isEnrolled(program.id) && (
                  <span className="enrolled-pill">Enrolled</span>
                )}
              </div>
              <h2 className="program-card-title">{program.title}</h2>
              <p className="program-card-dept">{program.department}</p>
              <p className="program-card-desc">{program.description}</p>
              <div className="program-card-meta">
                <span>⏱ {program.duration}</span>
                <span>📚 {program.credits} credits</span>
                <span>📖 {program.courses.length} courses</span>
              </div>
              <Link to={`/courses/${program.id}`} className="program-card-btn">
                View Program →
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <p>No programs match your search. Try different keywords.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setSearch(''); setSearchParams({}); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

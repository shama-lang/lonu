import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProgram } from '../data/courses';
import './Profile.css';

export default function Profile() {
  const { user, enrolled } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio || '',
  });
  const [saved, setSaved] = useState(false);

  const enrolledPrograms = enrolled.map(getProgram).filter(Boolean);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const initials = `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-inner">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and academic details.</p>
        </div>

        <div className="profile-grid">
          {/* Left: Avatar + Info */}
          <aside className="profile-sidebar">
            <div className="avatar-card">
              <div className="avatar">{initials}</div>
              <h2 className="profile-name">
                {user.firstName} {user.lastName}
              </h2>
              <span className="student-id">{user.studentId}</span>
              <div className="profile-stats">
                <div className="pstat">
                  <span className="pstat-val">{user.gpa}</span>
                  <span className="pstat-lbl">GPA</span>
                </div>
                <div className="pstat">
                  <span className="pstat-val">Year {user.year}</span>
                  <span className="pstat-lbl">Academic Year</span>
                </div>
                <div className="pstat">
                  <span className="pstat-val">{enrolledPrograms.length}</span>
                  <span className="pstat-lbl">Programs</span>
                </div>
              </div>
            </div>

            <div className="profile-verse-card">
              <span className="verse-cross">✝</span>
              <p>
                &ldquo;For I know the plans I have for you, declares the LORD, plans to prosper
                you and not to harm you, plans to give you hope and a future.&rdquo;
              </p>
              <cite>— Jeremiah 29:11</cite>
            </div>
          </aside>

          {/* Right: Details */}
          <main className="profile-main">
            {saved && (
              <div className="save-notice">✓ Profile information saved successfully.</div>
            )}

            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Personal Information</h3>
                {!editing && (
                  <button className="edit-btn" onClick={() => setEditing(true)}>
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleSave} className="edit-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio / Statement of Faith (optional)</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Share a little about yourself and your faith journey..."
                    />
                  </div>
                  <div className="edit-actions">
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <dl className="info-list">
                  <div className="info-item">
                    <dt>Full Name</dt>
                    <dd>{user.firstName} {user.lastName}</dd>
                  </div>
                  <div className="info-item">
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div className="info-item">
                    <dt>Student ID</dt>
                    <dd><code>{user.studentId}</code></dd>
                  </div>
                  <div className="info-item">
                    <dt>Academic Year</dt>
                    <dd>Year {user.year}</dd>
                  </div>
                  <div className="info-item">
                    <dt>Current Program</dt>
                    <dd>{user.program}</dd>
                  </div>
                  {form.bio && (
                    <div className="info-item info-item-full">
                      <dt>Bio</dt>
                      <dd>{form.bio}</dd>
                    </div>
                  )}
                </dl>
              )}
            </section>

            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Enrolled Programs</h3>
              </div>
              {enrolledPrograms.length === 0 ? (
                <p className="no-programs">No programs enrolled yet.</p>
              ) : (
                <ul className="enrolled-list">
                  {enrolledPrograms.map((p) => (
                    <li key={p.id} className="enrolled-item">
                      <div>
                        <span className={`type-pill ${p.type}`}>
                          {p.type === 'certificate' ? 'Certificate' : `${p.level} Degree`}
                        </span>
                        <strong>{p.title}</strong>
                        <span className="enrolled-meta"> · {p.department}</span>
                      </div>
                      <span className="enrolled-credits">{p.credits} credits</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

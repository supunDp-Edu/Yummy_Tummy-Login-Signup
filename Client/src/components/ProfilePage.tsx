import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  // Placeholder for user profile data
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const [form, setForm] = useState({
    firstName: user.firstName || user.username || "",
    lastName: user.lastName || "",
    email: user.email || "",
    mobile: user.mobile || "",
    password: user.password || "",
    gender: user.gender || "Male",
    address1: user.address1 || "",
    address2: user.address2 || "",
    city: user.city || "",
    postal: user.postal || "",
    district: user.district || "",
    province: user.province || "",
  });
  const [message, setMessage] = useState("");
  const profilePic = user.profilePic || `https://ui-avatars.com/api/?name=${user.username || "User"}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    // Here you would send the updated data to your backend
  };

  return (
    <div className="profile-page" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ maxWidth: 1200, width: '100%', padding: 48, background: '#f8f8f8', borderRadius: 18, boxShadow: '0 4px 24px rgba(255,107,107,0.10)', display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center' }}>
        {/* Left: Profile Card */}
        <div className="profile-card" style={{ width: 340, background: 'linear-gradient(135deg, #ffeaea 0%, #ff6b6b 100%)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40, boxShadow: '0 2px 12px rgba(255,107,107,0.10)' }}>
          <img src={profilePic} alt="Profile" style={{ width: 140, height: 140, borderRadius: '50%', marginBottom: 18, border: '4px solid #fff', background: '#fff' }} />
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6, color: '#222' }}>{form.firstName} {form.lastName}</div>
          <div style={{ fontSize: 16, color: '#ff6b6b', marginBottom: 18 }}>{form.email}</div>
          <div style={{ color: '#222', fontSize: 16, marginTop: 8, opacity: 0.8 }}><span style={{ fontSize: 20, marginRight: 6 }}>👤</span>Profile</div>
        </div>
        {/* Right: Bio Graph Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 400 }}>
          <h2 style={{ marginBottom: 18, fontWeight: 700, color: '#ff6b6b', fontSize: 28 }}>Bio Graph</h2>
          {message && <div style={{ background: '#ff6b6b', color: '#fff', padding: 14, borderRadius: 8, marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{message}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>First Name:</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Last Name:</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Mobile:</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Email Address:</label>
              <input name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Password:</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Gender:</label>
              <select name="gender" value={form.gender} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Address Line 1:</label>
              <input name="address1" value={form.address1} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Address Line 2:</label>
              <input name="address2" value={form.address2} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>City:</label>
              <input name="city" value={form.city} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Postal code:</label>
              <input name="postal" value={form.postal} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>District:</label>
              <input name="district" value={form.district} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 200 }}>
              <label style={{ color: '#222', fontWeight: 500 }}>Province:</label>
              <input name="province" value={form.province} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 4, marginBottom: 14, borderRadius: 6, border: '1px solid #ff6b6b', background: '#fff', color: '#222' }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: 32, padding: '12px 0', width: '100%', borderRadius: 6, background: '#ff6b6b', color: '#fff', border: 'none', fontWeight: 700, fontSize: 20, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 2px 8px rgba(255,107,107,0.10)' }}>
            UPDATE PROFILE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

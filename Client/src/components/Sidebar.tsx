import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, setVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const profilePic = user.profilePic || `https://ui-avatars.com/api/?name=${user.username || "User"}`;
  const links = [
    { to: "/profile", label: "Profile" },
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/order-history", label: "Order History" },
    { to: "/about", label: "About Us" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Hover area to trigger sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: "100vh",
          zIndex: 1100,
        }}
        onMouseEnter={() => setVisible(true)}
      />
      <aside
        className="sidebar-slideout"
        style={{
          width: 220,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          background: "#222",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
          zIndex: 1000,
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
          transform: visible ? "translateX(0)" : "translateX(-100%)"
        }}
        onMouseLeave={() => setVisible(false)}
      >
        {/* Profile section below navbar */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 0 16px 0",
          width: "100%",
          borderBottom: "1px solid #333",
          marginTop: 64 // adjust if your navbar is taller/shorter
        }}>
          <img
            src={profilePic}
            alt="Profile"
            style={{ width: 72, height: 72, borderRadius: "50%", marginBottom: 12, border: "2px solid #fff" }}
          />
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{user.username || "User"}</div>
          <div style={{ fontSize: 13, color: "#bbb" }}>{user.email || ""}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <nav style={{ width: "100%", marginTop: 16 }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: "block",
                  padding: "14px 32px",
                  color: location.pathname === link.to ? "#ff6b6b" : "#fff",
                  background: location.pathname === link.to ? "#181818" : "none",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: 16,
                  transition: "background 0.2s, color 0.2s",
                  borderLeft: location.pathname === link.to ? "4px solid #ff6b6b" : "4px solid transparent",
                  cursor: "pointer"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#333";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ff6b6b";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = location.pathname === link.to ? "#181818" : "none";
                  (e.currentTarget as HTMLAnchorElement).style.color = location.pathname === link.to ? "#ff6b6b" : "#fff";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ width: "100%", marginBottom: 32 }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '14px 32px',
              background: '#ff6b6b',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              marginTop: 8
            }}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
import styles from "./profile.module.css";
import { FiSettings, FiHelpCircle, FiCalendar, FiClock, FiLogOut } from "react-icons/fi";
import BottomNavbar from "../../components/BottomNavbar";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>My Profile</h1>
          <button className={styles.settingsBtn}>
            <FiSettings size={22} />
          </button>
        </header>

        <section className={styles.hero}>
          <div className={styles.avatarWrapper}>
            <img 
              src={user?.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.name} 
              alt="Profile" 
            />
          </div>
          <div className={styles.userInfo}>
            <h2>{user?.name || "User"}</h2>
            <p>{user?.email || "sharing@kindness.com"}</p>
          </div>
          <button className={styles.editBtn}>Edit Profile</button>
        </section>

        <section className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>12</span>
            <span className={styles.statLabel}>Donations</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>45</span>
            <span className={styles.statLabel}>Lives Impacted</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>8</span>
            <span className={styles.statLabel}>NGOs Helped</span>
          </div>
        </section>

        <nav className={styles.menu}>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}><FiClock /></div>
            <span>Donation History</span>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}><FiCalendar /></div>
            <span>Scheduled Pickups</span>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}><FiHelpCircle /></div>
            <span>Help & Support</span>
          </div>
          <div className={styles.menuItem} onClick={logout} style={{color: '#cf1322'}}>
            <div className={styles.menuIcon} style={{background: '#fff1f0'}}><FiLogOut /></div>
            <span>Logout</span>
          </div>
        </nav>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Profile;

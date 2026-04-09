import React from "react";
import styles from "./homePage.module.css";
import { BiSearch } from "react-icons/bi";
import { RiArrowRightSLine, RiHandHeartLine } from "react-icons/ri";
import { MdOutlineFoodBank } from "react-icons/md";

import NGOCard from "../../components/NGOCard";
import BottomNavbar from "../../components/BottomNavbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const campaignImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
];

const HomePage = (props) => {
  const { data } = props;
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <p>Namaste,</p>
          <h1>{user?.name || "Kind Soul"}</h1>
        </div>
        <div className={styles.searchBar}>
          <BiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Find NGOs or Food Drives..." />
        </div>
      </header>

      <main className={styles.main}>
        {/* Quick Actions */}
        <section className={styles.actions}>
          <Link to="/donationType" className={styles.actionCard}>
            <div className={styles.actionIcon} style={{background: 'var(--primary)'}}>
              <MdOutlineFoodBank size={24} color="white" />
            </div>
            <span>Donate Food</span>
          </Link>
          <Link to="/all" className={styles.actionCard}>
            <div className={styles.actionIcon} style={{background: 'var(--secondary)'}}>
              <RiHandHeartLine size={24} color="white" />
            </div>
            <span>Volunteer</span>
          </Link>
        </section>

        {/* Volunteer Opportunities */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Volunteer Required</h3>
            <Link to="/all" className={styles.seeAll}>
              <span>See all</span>
              <RiArrowRightSLine />
            </Link>
          </div>
          <div className={styles.horizontalScroll}>
            {data.map((el) => (
              <Link to={`/all/${el.id}`} key={el.id} className={styles.vCard}>
                <img src={el.image} alt={el.name} />
                <div className={styles.vInfo}>
                  <h4>{el.name}</h4>
                  <p>{el.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Campaigns */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Featured Campaigns</h3>
          </div>
          <div className={styles.campaignList}>
            {campaignImages.map((img, idx) => (
              <div key={idx} className={styles.campaignCard}>
                <img src={img} alt="Campaign" />
                <div className={styles.overlay}>
                  <span>Campaign #{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Food Required */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Nearby NGOs</h3>
            <Link to="/all" className={styles.seeAll}>
              <span>Explore</span>
              <RiArrowRightSLine />
            </Link>
          </div>
          <div className={styles.ngoList}>
            {data.slice(0, 3).map((ngo) => (
              <Link to={`/all/${ngo.id}`} key={ngo.id}>
                <NGOCard data={ngo} />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default HomePage;

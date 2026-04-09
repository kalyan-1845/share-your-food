import React, { useState } from "react";
import styles from "./confirmFoodDetails.module.css";
import BottomNavbar from "../../components/BottomNavbar";
import DonateFoodNavbar from "../../components/DonateFoodNavbar";
import { Link, useHistory } from "react-router-dom";

import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import Button from "../../components/Button";
import mockService from "../../services/mockService";

const ConfirmFoodDetails = ({ foodData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState({
    location: "Sector 15, MIDC Road, Spine City, Pune",
    phone: "",
    date: "",
    time: ""
  });

  const handlePost = async () => {
    setLoading(true);
    try {
      await mockService.postDonation({
        ...foodData,
        ...details,
        timestamp: new Date().toISOString()
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <IoCheckmarkCircleOutline size={80} color="var(--secondary)" />
          <h2>Donation Posted!</h2>
          <p>Thank you for your kindness. Someone will contact you soon for pickup.</p>
          <Button text="Back to Home" link="/" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <DonateFoodNavbar link="/foodDetails" />
      
      <main className={styles.main}>
        <section className={styles.summaryCard}>
          <div className={styles.summaryInfo}>
            <span className={styles.tag}>{foodData.type || "Veg"}</span>
            <h3>{foodData.meal || "Full Meal"}</h3>
            <p className={styles.quantity}>{foodData.quantity || 0} servings</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            alt="Food"
            className={styles.foodImg}
          />
        </section>

        <section className={styles.formSection}>
          <div className={styles.field}>
            <label><GoLocation /> Pickup Location</label>
            <input
              type="text"
              value={details.location}
              onChange={(e) => setDetails({...details, location: e.target.value})}
              placeholder="Enter pickup address"
            />
          </div>

          <div className={styles.field}>
            <label><BsTelephone /> Contact Information</label>
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={details.phone}
              onChange={(e) => setDetails({...details, phone: e.target.value})}
            />
          </div>

          <div className={styles.dateTimeRow}>
            <div className={styles.field}>
              <label>Date</label>
              <input 
                type="date" 
                value={details.date}
                onChange={(e) => setDetails({...details, date: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label>Time</label>
              <input 
                type="time" 
                value={details.time}
                onChange={(e) => setDetails({...details, time: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.guideline}>
            <input type="checkbox" id="guidelines" />
            <label htmlFor="guidelines">I confirm the food is fresh and safe to consume as per guidelines.</label>
          </div>
        </section>

        <div className={styles.btnWrapper}>
          <Button 
            text={loading ? "Posting..." : "Confirm & Post"} 
            onClick={handlePost} 
            disabled={loading}
          />
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default ConfirmFoodDetails;

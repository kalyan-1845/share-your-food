import React from "react";
import styles from "./ngoCard.module.css";
import { MdOutlineFastfood, MdLocationOn } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const NGOCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={data.image} alt={data.name} />
        <div className={styles.rating}>★ {data.rating || 4.5}</div>
      </div>
      <div className={styles.details}>
        <h4 className={styles.title}>{data.name}</h4>
        <div className={styles.info}>
          <MdLocationOn className={styles.icon} />
          <span>{data.location}</span>
        </div>
        <div className={styles.bottom}>
          <div className={styles.needed}>
            <MdOutlineFastfood className={styles.icon} />
            <span>{data.needed || "Meals needed"}</span>
          </div>
          <div className={styles.arrow}>
            <BsArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOCard;

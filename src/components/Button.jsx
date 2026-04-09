import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, link, onClick, type = "button", disabled = false, variant = "primary" }) => {
  const styles = {
    padding: "16px",
    borderRadius: "var(--radius-md)",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.7 : 1,
    background: variant === "primary" ? "var(--primary)" : "var(--secondary)",
    color: "white",
    textDecoration: "none"
  };

  if (link && !disabled) {
    return (
      <Link to={link} style={styles} className="btn-hover">
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      className="btn-hover"
    >
      {text}
    </button>
  );
};

export default Button;

import React from "react";
import "../styles.css";

import Loader from "../Loader";

export default function LightButton({ label = "Button", onClick, loading }) {
  return (
    <button
      className="button-1"
      role="button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <Loader size="xs" /> : label}
    </button>
  );
}

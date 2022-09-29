import React from "react";
import "./loader.css";

import classNames from "classnames";

const DEFAULT_SIZE = 12;

export default function index({ size = "xs" }) {
  return (
    <div
      role="loader"
      className={classNames("loader", {
        [size]: true,
      })}
    ></div>
  );
}

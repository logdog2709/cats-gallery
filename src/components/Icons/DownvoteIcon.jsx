import React from "react";
import classNames from "classnames";
import "../styles.css";

export default function DownvoteIcon({ active = false, onClick, count = 0 }) {
  return (
    <div className="row-center">
      <i
        role={"downvote-icon"}
        className={classNames("fa", "fa-solid", "fa-arrow-down", "icon", [
          ({
            active: active,
          },
          {
            inactive: !active,
          }),
        ])}
        onClick={onClick}
      ></i>
      <span role={"downvote-count"} className="text-bold-light ml-05">
        {count}
      </span>
    </div>
  );
}

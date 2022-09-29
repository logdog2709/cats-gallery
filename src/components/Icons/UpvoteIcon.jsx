import React from "react";
import classNames from "classnames";
import "../styles.css";

export default function UpvoteIcon({ active = false, onClick, count = 0 }) {
  return (
    <div className="row-center mr-1">
      <i
        role={"upvote-icon"}
        className={classNames("fa", "fa-solid", "fa-arrow-up", "icon", [
          ({
            active: active,
          },
          {
            inactive: !active,
          }),
        ])}
        onClick={onClick}
      ></i>
      <span className="text-bold-light ml-05" role={"upvote-count"}>
        {count}
      </span>
    </div>
  );
}

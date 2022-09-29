import React from "react";
import classNames from "classnames";
import "../styles.css";

export default function FavoriteIcon({ active = false, onClick }) {
  return (
    <i
      role="favorite-icon"
      onClick={onClick}
      className={classNames("fa", "icon", [
        {
          "fa-bookmark-o outline": !active,
        },
        {
          "fa-bookmark filled": active,
        },
      ])}
    ></i>
  );
}

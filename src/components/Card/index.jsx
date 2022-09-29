import React from "react";
import "../styles.css";
import FavoriteIcon from "../Icons/FavoriteIcon";
import UpvoteIcon from "../Icons/UpvoteIcon";
import DownvoteIcon from "../Icons/DownvoteIcon";

import favouriteActions from "../../redux/actions/favourite";

import snackbarOptions from "../../constants/snackbar";
import { useSnackbar } from "react-simple-snackbar";

export default function Card({ isFavorite, url, subId, imageId }) {
  const [openSnackbar] = useSnackbar(snackbarOptions.error);

  const [favorite, setFavorite] = React.useState(isFavorite);
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);

  const [upvoteCount, setUpvoteCount] = React.useState(0);
  const [downvoteCount, setDownvoteCount] = React.useState(0);

  const onFavoriteClick = async () => {
    setFavorite(!favorite);
    if (!favorite) {
      const [, error] = await favouriteActions.addImageToFavourite({
        subId: subId,
        imageId: imageId,
      });
      if (error) {
        openSnackbar(error);
      }
    } else {
      const [, error] = await favouriteActions.removeImageFromFavourite({
        imageId,
      });
      if (error) {
        openSnackbar(error);
      }
    }
  };

  const onUpvoteClick = () => {
    if (downvoted) {
      setDownvoted(false);
      setDownvoteCount((prevCount) => prevCount - 1);
    }

    if (upvoted) {
      setUpvoteCount((prevCount) => prevCount - 1);
    } else {
      setUpvoteCount((prevCount) => prevCount + 1);
    }

    setUpvoted(!upvoted);
  };

  const onDownvoteClick = () => {
    if (upvoted) {
      setUpvoted(false);
      setUpvoteCount((prevCount) => prevCount - 1);
    }

    if (downvoted) {
      setDownvoteCount((prevCount) => prevCount - 1);
    } else {
      setDownvoteCount((prevCount) => prevCount + 1);
    }
    setDownvoted(!downvoted);
  };

  return (
    <div
      role="cat-image"
      className="card"
      style={{
        backgroundImage: `url('${url}')`,
      }}
    >
      <div className="favorite mr-1">
        <FavoriteIcon active={favorite} onClick={onFavoriteClick} />
      </div>

      <div className="vote-icons">
        <UpvoteIcon
          active={upvoted}
          onClick={onUpvoteClick}
          count={upvoteCount}
        />
        <DownvoteIcon
          active={downvoted}
          onClick={onDownvoteClick}
          count={downvoteCount}
        />
      </div>
    </div>
  );
}

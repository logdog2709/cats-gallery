import React, { useEffect, useState } from "react";
import "./gridview.css";
import Card from "../Card";
import Loader from "../Loader";

import favouriteActions from "../../redux/actions/favourite";

import { withSnackbar } from "react-simple-snackbar";
import snackbarOptions from "../../constants/snackbar";

function GridView({ data = [], loading = false, openSnackbar }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const _favourites = favouriteActions.getFavorites();
    setFavourites(_favourites);
  }, []);

  const onFavoriteClick = async (favorite, subId, imageId) => {
    if (favorite) {
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

  if (loading) {
    return (
      <div className="container-center mt-4">
        <Loader size="m" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container-center no-records" role="no-records">
        <h1 className="text">No cats found!</h1>
        <div className="text">Start by uploading a cat picture.</div>
      </div>
    );
  }
  return (
    <div className="photo-grid">
      {data.map((item) => (
        <Card
          key={item.id}
          url={item.url}
          isFavorite={favourites.includes(item.id)}
          onFavoriteClick={(fav) => onFavoriteClick(fav, item.sub_id, item.id)}
        />
      ))}
    </div>
  );
}

export default withSnackbar(GridView, snackbarOptions.error);

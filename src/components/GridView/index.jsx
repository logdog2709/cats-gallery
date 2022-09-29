import React, { useEffect, useState } from "react";
import "./gridview.css";
import Card from "../Card";
import Loader from "../Loader";

import favouriteActions from "../../redux/actions/favourite";

export default function GridView({ data = [], loading = false }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const _favourites = favouriteActions.getFavorites();

    setFavourites(_favourites);
  }, []);

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
          imageId={item.id}
          subId={item.sub_id}
          isFavorite={favourites.includes(item.id)}
        />
      ))}
    </div>
  );
}

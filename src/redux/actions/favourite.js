import catsApi from "../../network/catsApi";
import endpoints from "../../constants/endpoints";

import { storeValues, deleteValue, findItem } from "../../utils/storage";

const FAVOURITE_SK = "favourites";

const getFavorites = (key = "imageId") => {
  const favourites = localStorage.getItem(FAVOURITE_SK);
  if (favourites) {
    const _favourites = JSON.parse(favourites);
    return _favourites.map((item) => item[key]);
  }
  return [];
};

const addImageToFavourite = async ({ subId, imageId }) => {
  try {
    const res = await catsApi.post(endpoints.favourites, {
      sub_id: subId,
      image_id: imageId,
    });

    if (res.status === 200) {
      storeValues(FAVOURITE_SK, [
        {
          id: res.data.id,
          imageId: imageId,
        },
      ]);
      return [res.data, null];
    }
    return [null, "Something went wrong. Please try again."];
  } catch (error) {
    console.log(error.message);
    return [null, error.response.data];
  }
};

const removeImageFromFavourite = async ({ imageId }) => {
  try {
    const favouriteItem = findItem(FAVOURITE_SK, "imageId", imageId);

    if (!favouriteItem) {
      throw new Error("Could not find image in favourites!");
    }

    const favouriteId = favouriteItem.id;

    const res = await catsApi.delete(`${endpoints.favourites}/${favouriteId}`);

    if (res.status === 200) {
      deleteValue(FAVOURITE_SK, "id", favouriteId);
      return [res.data, null];
    }
    return [null, "Something went wrong. Please try again."];
  } catch (error) {
    console.log(error.message);
    return [null, error.message || error.response.data];
  }
};

const favouriteActions = {
  getFavorites,
  addImageToFavourite,
  removeImageFromFavourite,
};

export default favouriteActions;

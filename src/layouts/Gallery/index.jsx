import React, { useState, useEffect, useContext } from "react";
import "./gallery.css";
import { useDispatch, useSelector } from "react-redux";

import { useSnackbar } from "react-simple-snackbar";
import snackbarOptions from "../../constants/snackbar";

import GridView from "../../components/GridView";
import LightButton from "../../components/Buttons/LightButton";

import UserContext from "../../context/UserContext";

import imageActions from "../../redux/actions/images";

const LIMIT = 4;

export default function Gallery() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [page, setPage] = useState(0);

  const cats = useSelector((state) => state.cats);

  const user = useContext(UserContext);

  const [errorSnackbar] = useSnackbar(snackbarOptions.error);

  useEffect(() => {
    (async function () {
      if (!user) return;

      setLoading(true);

      const [catImages, error] = await dispatch(
        imageActions.fetchUploadedCatImages({
          subId: user.subId,
          page: page,
          limit: LIMIT,
        })
      );
      setLoading(false);

      if (error) {
        errorSnackbar(error);
      } else {
        if (catImages.length < LIMIT) {
          setShowMoreVisible(false);
        }
      }
    })();
  }, [user, page]);

  const onShowMore = async () => {
    let _page = page + 1;
    setPage(_page);
  };

  return (
    <div>
      <GridView data={cats} loading={page === 0 && loading}></GridView>

      {showMoreVisible && cats.length > 0 && (
        <div className="show-more">
          <LightButton
            label="Show More"
            loading={loading}
            onClick={onShowMore}
          />
        </div>
      )}
    </div>
  );
}

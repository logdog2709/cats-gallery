import { APPEND_UPLOADED_IMAGES, SET_UPLOADED_IMAGES } from "../../redux/types";
import catsApi from "../../network/catsApi";
import endpoints from "../../constants/endpoints";

const fetchUploadedCatImages =
  ({ subId, limit, page = 0 }) =>
  async (dispatch) => {
    try {
      const res = await catsApi.get(endpoints.uploaded_images, {
        params: {
          sub_id: subId,
          limit,
          page,
          include_vote: 1,
          include_favourite: 1,
        },
      });

      if (res.status === 200) {
        if (page === 0) {
          dispatch({
            type: SET_UPLOADED_IMAGES,
            payload: res.data,
          });
        } else {
          dispatch({
            type: APPEND_UPLOADED_IMAGES,
            payload: res.data,
          });
        }
        return [res.data, null];
      }
      return [null, "Something went wrong. Please try again."];
    } catch (error) {
      console.log(error.message);
      return [null, `${error.response.data}`];
    }
  };

async function uploadCatImage({ file, subId }) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sub_id", subId);

    const res = await catsApi.post(endpoints.upload_image, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 201) {
      return [res.data, null];
    }
    return [null, "Something went wrong. Please try again."];
  } catch (error) {
    console.log(error.message);
    return [null, `${error.response.data}`];
  }
}

const appendCatImage = (payload) => (dispatch) => {
  dispatch({
    type: APPEND_UPLOADED_IMAGES,
    payload: [payload],
  });
};

const imageActions = {
  fetchUploadedCatImages,
  uploadCatImage,
  appendCatImage,
};

export default imageActions;

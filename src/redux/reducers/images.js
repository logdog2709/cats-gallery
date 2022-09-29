import { SET_UPLOADED_IMAGES, APPEND_UPLOADED_IMAGES } from "../types";

const initialState = [];

function catsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_UPLOADED_IMAGES:
      return payload;
    case APPEND_UPLOADED_IMAGES:
      return [...state, ...payload];
    default:
      return state;
  }
}

export default catsReducer;

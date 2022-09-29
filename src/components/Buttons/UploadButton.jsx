import React, { useState, useRef, useContext } from "react";
import "../styles.css";

import { useSnackbar } from "react-simple-snackbar";
import snackbarOptions from "../../constants/snackbar";

import Loader from "../Loader";

import { useDispatch } from "react-redux";

import UserContext from "../../context/UserContext";
import imageActions from "../../redux/actions/images";

export default function UploadButton({ label = "Upload" }) {
  const dispatch = useDispatch();

  const [openSuccessSnackbar] = useSnackbar(snackbarOptions.success);
  const [openErrorSnackbar] = useSnackbar(snackbarOptions.error);

  const user = useContext(UserContext);
  const inputRef = React.useRef(null);

  const [fileName, setFileName] = useState(undefined);

  const onPickFile = () => {
    inputRef.current.click();
  };

  const onChange = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const [uploadedImage, error] = await imageActions.uploadCatImage({
      file,
      subId: user.subId,
    });
    if (error) {
      // alert(error);
      openErrorSnackbar(error);
    } else {
      dispatch(imageActions.appendCatImage(uploadedImage));
      openSuccessSnackbar(`Meow!! Image uploaded successfully 🐾`);
    }
    setFileName(undefined);
  };

  return (
    <>
      <input
        ref={inputRef}
        onChange={onChange}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        style={{ display: "none" }}
        multiple={false}
      />
      {fileName ? (
        <div
          className="upload-button mt-10p bg-inactive"
          role="upload-indicator"
        >
          <span>{"Uploading"}</span>
          <span className="ml-05">
            <Loader size="xs" />
          </span>
        </div>
      ) : (
        <div
          className="upload-button mt-10p"
          role="upload-button"
          onClick={onPickFile}
        >
          <span>{label.toUpperCase()}</span>
          <i className="fa fa-upload ml-05"></i>
        </div>
      )}
    </>
  );
}

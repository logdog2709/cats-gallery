import React from "react";
import UploadButton from "./Buttons/UploadButton";

export default function Header() {
  return (
    <header className="row-center">
      <h1 className="branding mr-2">Cats Gallery</h1>
      <UploadButton />
    </header>
  );
}

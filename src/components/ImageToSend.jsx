import React, { useState, useEffect } from "react";

const ImageToSend = (props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const imgURL = URL.createObjectURL(props.blob);
    setImageSrc(imgURL);
    document.getElementById("a1").href = imgURL;
  }, [props.blob]);

  return (
    <a id="a1" download="file.png" href="">
      <img
        style={{ width: "150px", height: "auto", margin: "0 5px" }}
        src={imageSrc}
        alt={props.fileName}
      />
    </a>
  );
};

export default ImageToSend;

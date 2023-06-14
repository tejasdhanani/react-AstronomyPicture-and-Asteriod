import React, { useEffect, useState } from "react";
import { fetchApi } from "../functions/fetchApi";

export const APOD = () => {
  const [loading, setLoading] = useState(true);
  const [apod, setApod] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [isImage, setIsImage] = useState(true);

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi(
        "https://api.nasa.gov/planetary/apod?api_key=KoeXm56GamRb6bpoUhU5dRfKycCyIceQVb1GhMBM"
      );
      setApod(response);
      // console.log(response);

      if (response.media_type === "video") {
        setIsImage(false);
      }

      try {
        await fetch(response.hdurl, { mode: "no-cors" });
        console.log("loading the hdurl: ", response.hdurl);
        setBgUrl(response.hdurl);
      } catch (error) {
        console.log("ERROR: ", error);
        console.log("loading the url: ", response.url);
        setBgUrl(response.url);
      }

      setLoading(false);
    }

    asyncFetch();
  }, []);

  if (loading) {
    return <h3>App is loading, please wait...</h3>;
  }
  return (
    <div className="text-light">
      <h1 className="text-center mt-4">{apod.title}</h1>
      <h3 className="text-center my-2">{apod.copyright}</h3>

      {!isImage ? (
        <div style={{ textAlign: "center" }}>
          <iframe
            src={apod.url}
            frameborder="0"
            allow="autoplay"
            allowfullscreen
            title="video"
            height="400"
            width="800"
          />
        </div>
      ) : (
        <img
          src={bgUrl}
          alt="astronomical display of the day"
          style={{
            width: "100%",
          }}
        />
      )}
      <p
        className="text-justify m-4 fw-light"
        style={{
          fontSize: "1.5rem",
          lineHeight: "2",
        }}
      >
        {apod.explanation}
      </p>
    </div>
  );
};

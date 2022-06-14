import React, { useEffect, useState } from "react";
import { fetchApi } from "../functions/fetchApi";

export const APOD = () => {
  const [loading, setLoading] = useState(true);
  const [apod, setApod] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi(
        "https://api.nasa.gov/planetary/apod?api_key=KoeXm56GamRb6bpoUhU5dRfKycCyIceQVb1GhMBM"
      );
      setApod(response);
      // console.log(response);

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

      <img src={bgUrl} alt="image of apod" style={{
        width: "100%",
      }} />
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

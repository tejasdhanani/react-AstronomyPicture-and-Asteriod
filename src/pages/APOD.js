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

      try {
        await fetch(response.hdurl);
        setBgUrl(response.hdurl);
      } catch {
        setBgUrl(response.url);
      }

      setLoading(false);

      fetch(response.hdurl)
        .then((response) => {
          console.log("response.status: ", response.status); // 👉️ 200
          setBgUrl(response.hdurl);
        })
        .catch((err) => {
          console.log("error: " + err);
          setBgUrl(response.url);
        });
    }

    asyncFetch();
  }, []);

  const background = {
    backgroundImage: "url(" + bgUrl + ")",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  if (loading) {
    return <h3>App is loading, please wait...</h3>;
  }
  return (
    <>
      <h1 className="text-center my-2">{apod.title}</h1>
      <h3 className="text-center my-2">{apod.copyright}</h3>

      <div
        className="d-flex justify-content-center align-items-center"
        style={background}
      ></div>
      <p
        className="text-justify m-4 fw-light"
        style={{
          fontSize: "1.5rem",
          lineHeight: "2",
        }}
      >
        {apod.explanation}
      </p>
    </>
  );
};

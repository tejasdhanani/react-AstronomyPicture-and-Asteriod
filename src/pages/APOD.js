import React, { useEffect, useState } from "react";

export const APOD = () => {
  const [loading, setLoading] = useState(true);
  const [apod, setApod] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setApod(data);

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <h3>App is loading, please wait...</h3>;
  }
  return (
    <div className="text-light">
      <h1 className="text-center mt-4">{apod.title}</h1>
      <h3 className="text-center my-2">{apod.copyright}</h3>

      {apod.media_type === "video" ? (
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
          src={apod.hdurl}
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

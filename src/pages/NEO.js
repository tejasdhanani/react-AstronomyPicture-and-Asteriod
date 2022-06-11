import React, { useEffect, useState } from "react";
import { fetchApi } from "../functions/fetchApi";

export const NEO = () => {
  const [loading, setLoading] = useState(true);
  const [neo, setNeo] = useState("");
  const todaysDate = new Date().toLocaleString().split(",")[0];

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi(
        "https://api.nasa.gov/neo/rest/v1/feed?" +
          "start_date=" +
          todaysDate +
          "&end_date=" +
          todaysDate +
          "&api_key=KoeXm56GamRb6bpoUhU5dRfKycCyIceQVb1GhMBM"
      );
      setNeo(response.near_earth_objects);
      console.log(response.near_earth_objects);
      setLoading(false);
    }

    asyncFetch();
  }, [todaysDate]);

  const neoStyle = {
    maxWidth: "20rem",
  };

  const NeoItem = () => {
    return (
      <div className="pt-5" style={{ width: "60%", margin: "0 auto" }}>
        <div className="d-flex flex-wrap justify-content-around">
          {neo[todaysDate].map((n) => (
            <div className="card text-white bg-dark mb-5" style={neoStyle}>
              <div className="card-header">{n.name}</div>
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Closest on {n.close_approach_data[0].close_approach_date_full}
                </h5>
                <p className="card-text">
                  Max Diameter:&nbsp;
                  {n.estimated_diameter.kilometers.estimated_diameter_max}
                  <br />
                  {n.is_potentially_hazardous_asteroid ? (
                    <p className="text-danger">
                      It is hazardous bro be carefull
                    </p>
                  ) : (
                    "chal chal have"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!loading) {
    return (
      <>
        <h4>Date is {todaysDate}</h4>
        <NeoItem />
      </>
    );
  } else {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
};

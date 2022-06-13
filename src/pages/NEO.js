import React, { useEffect, useState } from "react";
import { fetchApi } from "../functions/fetchApi";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import { MdDateRange } from "react-icons/md";
import "./neo.css";

export const NEO = () => {
  const [loading, setLoading] = useState(true);
  const [neo, setNeo] = useState("");
  const [date, setDate] = useState(new Date());
  // const todaysDate = new Date().toLocaleDateString();

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi(
        "https://api.nasa.gov/neo/rest/v1/feed?" +
          "start_date=" +
          date.toLocaleDateString() +
          "&end_date=" +
          date.toLocaleDateString() +
          "&api_key=KoeXm56GamRb6bpoUhU5dRfKycCyIceQVb1GhMBM"
      );
      setNeo(response.near_earth_objects);
      console.log(response.near_earth_objects);
      setLoading(false);
    }

    asyncFetch(date);
  }, [date]);

  const NeoItem = () => {
    return (
      <div className="pt-3" style={{ width: "75%", margin: "0 auto" }}>
        <div className="d-flex flex-wrap justify-content-around">
          {neo[date.toLocaleDateString()].map((n) => (
            <a
              key={n.id}
              className="neoStyle card text-white bg-dark m-3 container-sm text-decoration-none"
              href={n.nasa_jpl_url}
              target="_blank"
              rel="noreferrer"
            >
              <h4 className="card-header border-light">{n.name}</h4>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <MdDateRange className="mb-1" />
                  &nbsp;
                  {n.close_approach_data[0].close_approach_date_full}
                </h5>
                <div className="card-text">
                  <p className="mb-0">Id: {n.id}</p>
                  <p className="mb-0">
                    Max Diameter:&nbsp;
                    {n.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                      2
                    )}
                    &nbsp;kms
                  </p>
                  <p className="mb-0">
                    Hazardous:&nbsp;
                    {n.is_potentially_hazardous_asteroid ? (
                      <span className="text-danger">True</span>
                    ) : (
                      <span className="text-success">False</span>
                    )}
                  </p>
                  <p className="mb-0">
                    Relative Velocity:&nbsp;
                    {Number(
                      n.close_approach_data[0].relative_velocity
                        .kilometers_per_hour
                    ).toFixed(2)}
                    &nbsp;km/hr
                  </p>
                  <p className="mb-0">
                    Miss Distance:&nbsp;
                    {Number(
                      n.close_approach_data[0].miss_distance.kilometers
                    ).toFixed(2)}
                    &nbsp;kms
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  if (!loading && neo[date.toLocaleDateString()]) {
    return (
      <>
        <div className="d-flex justify-content-center my-4">
          <Calendar
            className="rounded-2 bg-light"
            onChange={setDate}
            value={date}
          />
        </div>
        <h4 className="text-center text-light">
          NEOs for {date.toLocaleDateString()}{" "}
        </h4>
        <NeoItem />
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mt-4 text-light">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
};

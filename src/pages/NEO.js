import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import "./neo.css";
import moment from "moment";
import { NeoItem } from "../components/NeoItem";

export const NEO = () => {
  const [loading, setLoading] = useState(true);
  const [neo, setNeo] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://api.nasa.gov/neo/rest/v1/feed?" +
          "start_date=" +
          moment(date).format("YYYY-MM-DD") +
          "&end_date=" +
          moment(date).format("YYYY-MM-DD") +
          "&api_key=" +
          process.env.REACT_APP_API_KEY
      );
      const data = await response.json();
      setNeo(data.near_earth_objects);
      setLoading(false);
    })();
  }, [date]);

  // If Loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4 text-light">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  // If the date has been given
  else if (neo[moment(date).format("YYYY-MM-DD")]) {
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
        <NeoItem neo={neo} date={date} />
      </>
    );
  }
};

import moment from "moment";
import { MdDateRange } from "react-icons/md";

export const NeoItem = ({ neo, date }) => {
  return (
    <div
      className="neo-container pt-3"
      style={{ width: "75%", margin: "0 auto" }}
    >
      <div className="d-flex flex-wrap justify-content-around">
        {neo[moment(date).format("YYYY-MM-DD")].map((n) => (
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

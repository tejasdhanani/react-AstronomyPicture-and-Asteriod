import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="d-md-flex d-block flex-row mx-md-auto mx-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                APOD
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/neo">
                NEO
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

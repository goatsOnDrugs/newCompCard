import React from "react";
import { Link, navigate } from "@reach/router";

import { AUTH_TOKEN } from "../../constants";
import "./SideDrawer.css";

const SideDrawer = props => {
  let drawerClasses = ["side-drawer"];
  if (props.show) {
    drawerClasses = ["side-drawer", "open"];
  }
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <Link to="/">Link</Link>
        </li>
        <li>
          <Link to="/login">
            <div className="flex flex-fixed">
              {authToken ? (
                <div
                  className="ml1 pointer black"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    navigate("/login");
                  }}
                >
                  logout
                </div>
              ) : (
                <Link to="/login" className="ml1 no-underline black">
                  login
                </Link>
              )}
            </div>
          </Link>
        </li>
        <li>
          <Link to="/routes">Routes</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;

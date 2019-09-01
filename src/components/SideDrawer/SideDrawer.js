import React from "react";
import { Link, navigate } from "@reach/router";

import { MenuConsumer } from "../../contexts/MenuContext";
import { AUTH_TOKEN } from "../../constants";
import "./SideDrawer.css";

const SideDrawer = props => {
  let drawerClasses = ["side-drawer"];
  if (props.show) {
    drawerClasses = ["side-drawer", "open"];
  }
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <MenuConsumer>
      {context => (
        <nav className={drawerClasses.join(" ")}>
          <ul>
            <li onClick={context.drawerToggle}>
              <Link to="/">Link</Link>
            </li>
            <li onClick={context.drawerToggle}>
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
            <li onClick={context.drawerToggle}>
              <Link to="/routes">Routes</Link>
            </li>
            <li onClick={context.drawerToggle}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      )}
    </MenuConsumer>
  );
};

export default SideDrawer;

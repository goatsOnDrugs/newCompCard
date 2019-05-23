import React from "react"
import { Link } from "@reach/router"
import "../SideDrawer/DrawerToggleButton"
import "./Toolbar.css"
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton"

const Toolbar = props => {
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar_logo">
          <Link to="/">CompCard</Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <Link to="/">Top Five</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Something else</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Toolbar

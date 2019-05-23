import React from 'react';
import { Link } from '@reach/router';

import './SideDrawer.css';

const SideDrawer = props => {
  let drawerClasses = ['side-drawer'];
  if (props.show) {
    drawerClasses = ['side-drawer', 'open'];
  }

  return (
    <nav className={drawerClasses.join(' ')}>
      <ul>
        <li>
          <Link to='/'>Link</Link>
        </li>
        <li>
          <Link to='/'>Link</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;

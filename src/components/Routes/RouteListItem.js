import React from 'react';
import './RouteListItem.css';
import { Link } from '@reach/router';
const RouteListItem = props => {
  return (
    <Link to='/route' state={{ id: props.id }} className='container'>
      <div>
        {props.title[0]}
        {props.title[props.title.length - 1]}
      </div>
      <div>points: {props.points}</div>
      <div> > </div>
    </Link>
  );
};

export default RouteListItem;

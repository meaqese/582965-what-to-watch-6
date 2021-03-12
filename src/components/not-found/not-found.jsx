import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
  return <>
    <h1 className="visually-hidden">WTW</h1>

    <header className="page-header user-page__head">
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <h1 className="page-title user-page__title">Page Not Found</h1>

      <div className="user-block">
        <Link to="/">Go to home</Link>
      </div>
    </header>
  </>;
};

export default NotFound;

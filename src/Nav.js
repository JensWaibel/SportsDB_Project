import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <Link className="navStyle" to="/playersearch">
          <li>Player Search</li>
        </Link>
        <Link className="navStyle" to="/leaguequiz">
          <li>League Quiz</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;

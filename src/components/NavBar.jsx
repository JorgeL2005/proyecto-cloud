import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home/notes">Notes</Link></li>
        <li><Link to="/home/courses">Courses</Link></li>
        <li><Link to="/home/progress">Academic Progress</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

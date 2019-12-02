import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaIdCard } from 'react-icons/fa';


const Navbar = ({ title , icon}) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        {icon} {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}


Navbar.propTypes = {
  title: PropTypes.string.isRequired ,
  icon: PropTypes.object.isRequired, 
}

Navbar.defaultProps = {
  title: 'Cloud Contacts Storage' ,
  icon: <FaIdCard />
} 


export default Navbar;
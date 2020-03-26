import React from 'react';
import './Navbar.css';

const Navbar = ({ changeRoute }) => {
  return(
    <nav className='nav-bar'>
      <button 
        type="button"
        onClick={ () => changeRoute("show") }
      >
        Workout List
      </button>
      <button 
        type="button"
        onClick={ () => changeRoute("create") }
      >
        Track New Workout
      </button>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import logogo from './Assets/Group 583 (1).png';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logogo} 
                style={{
                    width:'114px',
                    height:'37.29px'
                }}
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

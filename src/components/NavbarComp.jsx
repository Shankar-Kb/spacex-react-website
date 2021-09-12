//import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarComp = () => {

    return (
        <div className="navbar-box">
            <div className="navbar-container">
                <nav className="navbar navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">SpaceX React Website</Link>
                    <div className="navbar-right-box">
                        <Link className="btn btn-dark" to="/history">History</Link>
                        <Link className="btn btn-dark" to="/launches">Launches</Link>
                        <Link className="btn btn-dark" to="/rockets">Rockets</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}


export default NavbarComp;
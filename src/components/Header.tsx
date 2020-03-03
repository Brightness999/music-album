import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <header className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <NavLink to="/home" activeClassName="active">Home</NavLink>
                <NavLink to="/genres" onMouseEnter={ () => setDropdownOpen(true) }>Genres</NavLink>
                { dropdownOpen?
                        <div className="position-absolute genres-popup"
                             onMouseOut={ () => setDropdownOpen(false) }/>:
                        <div/>
                }
                <NavLink to="/all-releases" activeClassName="active">All releases</NavLink>
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={ faSearch } className="search-icon"/>
                    <Input placeholder="Search here..." id="iSearch"/>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <NavLink to="/premium" activeClassName="active">Premium</NavLink>
                <NavLink to="/account" activeClassName="active">Account</NavLink>
                <NavLink to="/contact" activeClassName="active">Contact</NavLink>
            </div>
        </header>
    );
}

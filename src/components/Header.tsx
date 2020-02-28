import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Input } from "reactstrap";

export function Header() {
    return (
        <header className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <NavLink to="home" activeClassName="active">Home</NavLink>
                <NavLink to="genres" activeClassName="active">Genres</NavLink>
                <NavLink to="all-releases" activeClassName="active">All releases</NavLink>
                <Input placeholder="Search here..." id="iSearch"></Input>
            </div>
            <div className="d-flex align-items-center">
                <NavLink to="premium" activeClassName="active">Premium</NavLink>
                <NavLink to="account" activeClassName="active">Account</NavLink>
                <NavLink to="contact" activeClassName="active">Contact</NavLink>
            </div>
        </header>
    );
}
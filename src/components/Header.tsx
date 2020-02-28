import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "reactstrap";

export function Header() {
    return (
        <header className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <Link to="home" className="active">Home</Link>
                <Link to="genres">Genres</Link>
                <Link to="all-releases">All releases</Link>
                <Input placeholder="Search here..." id="iSearch"></Input>
            </div>
            <div className="d-flex align-items-center">
                <Link to="premium">Premium</Link>
                <Link to="account">Account</Link>
                <Link to="contact">Contact</Link>
            </div>
        </header>
    );
}
import React, { createRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { selectCategories } from '../redux/selectors';

export function Header() {
    const categories = useSelector(selectCategories);
    const genresMenuWrapper = createRef<HTMLDivElement>();

    return (
        <header className="d-flex position-fixed align-items-center justify-content-between w-100">
            <div className="header-wrapper d-flex justify-content-around">
                <div className="d-flex align-items-center">
                    <NavLink to="/home" activeClassName="active">Home</NavLink>
                    <div className="genres-menu">
                        <span className="genres-link pr-4" onMouseOver={() => {
                            if (genresMenuWrapper.current !== null) {
                                genresMenuWrapper.current.hidden = false;
                            }
                        }}>Genres</span>
                        <div className="position-absolute sub-menu-wrapper" ref={genresMenuWrapper}>
                            {
                                categories.map(((category, index) =>
                                    <NavLink
                                        onClick={ () => {
                                            if (genresMenuWrapper.current !== null) {
                                                genresMenuWrapper.current.hidden = true;
                                            }
                                        } }
                                        to={`/genres/${category.slug}`}
                                        key={index}
                                    >{category.name}</NavLink>))
                            }
                        </div>
                    </div>

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
            </div>
        </header>
    );
}

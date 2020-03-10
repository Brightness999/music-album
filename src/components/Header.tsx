import React, { createRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { selectCategories, selectLoggedIn, selectWideScreen } from '../redux/selectors';
import { setLoggedIn } from '../redux/actions';
import history from '../history';

export function Header() {
    const categories = useSelector(selectCategories);
    const [keyword, setKeyword] = useState('');
    const genresMenuWrapper = createRef<HTMLDivElement>();
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();
    const wideScreen = useSelector(selectWideScreen);
    const classWide = wideScreen?' w-100 black-thin-bar':'';
    return (
        <header className={"d-flex position-fixed align-items-center justify-content-between" + classWide}>
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
                        <Input placeholder="Search here..." id="iSearch" value={keyword} onChange={event => setKeyword(event.target.value)} onKeyDown={event => {
                            if (event.key === 'Enter') {
                                history.push(`/search/${keyword}`);
                            }
                        }}/>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <NavLink to="/premium" activeClassName="active">Premium</NavLink>
                    <NavLink to="/account" activeClassName="active">Account</NavLink>
                    <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                    {loggedIn?
                    <div className="genre-link" onClick={() => {
                        localStorage.removeItem('token');
                        dispatch(setLoggedIn(false));
                    }}><FontAwesomeIcon icon={faSignOutAlt}/></div>:(<span/>)}
                </div>
            </div>
        </header>
    );
}

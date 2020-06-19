import React, { createRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Input, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { selectCategories, selectLoggedIn } from '../redux/selectors';
import { setLoggedIn } from '../redux/actions';
import history from '../history';
import { environment } from '../environments/envrionment';

export function Header() {
    const categories = useSelector(selectCategories);
    const [keyword, setKeyword] = useState('');
    const genresMenuWrapper = createRef<HTMLDivElement>();
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();
    let categoryLinks: JSX.Element[] = [];
    const categoryCount = categories.length;
    for (let i = 0; i < categoryCount; i += 2) {
        
        const category1 = categories[i];
        const category2 = categories[i+1];
        categoryLinks.push(<Row className="py-2" key={i}>
            <Col><NavLink
                onClick={ () => {
                    if (genresMenuWrapper.current !== null) {
                        genresMenuWrapper.current.hidden = true;
                    }
                } }
                to={`/genres/${category1.slug}/s/LIST/p/0`}
            >{category1.name}</NavLink></Col>
            <Col><NavLink
                onClick={ () => {
                    if (genresMenuWrapper.current !== null) {
                        genresMenuWrapper.current.hidden = true;
                    }
                } }
                to={`/genres/${category2?.slug}/s/LIST/p/0`}
            >{category2?.name}</NavLink></Col>
        </Row>)
    }
    return (
        <header className={"d-flex position-fixed align-items-center justify-content-between"}>
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
                                categoryLinks
                            }
                        </div>
                    </div>

                    <NavLink to="/all-releases/s/GRID/p/0" activeClassName="active">All releases</NavLink>
                    <NavLink to="/vinyl/s/GRID/p/0" activeClassName="active">Vinyl</NavLink>
                    <NavLink to="/bandcamp/s/GRID/p/0" activeClassName="active">Bandcamp</NavLink>
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={ faSearch } className="search-icon"/>
                        <Input placeholder="Search here..." id="iSearch" value={keyword} onChange={event => setKeyword(event.target.value)} onKeyDown={event => {
                            if (event.key === 'Enter') {
                                history.push(`/search/${keyword}/p/0`);
                                setKeyword('');
                            }
                        }}/>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <NavLink to="/premium" activeClassName="active">Premium</NavLink>
                    { !environment.TEST_MODE && <NavLink to="/account" activeClassName="active">Account</NavLink> }
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

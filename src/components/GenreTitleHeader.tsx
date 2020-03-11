import React from 'react';
import { Category } from '../models';
import { NavLink } from 'react-router-dom';

interface Props {
    category?: Category;
}

export default function GenreTitleHeader(props: Props) {
    return (
        <div className="album-title-header">
            <div>
                <NavLink to={`/genres/${props.category?.slug}/s/LIST/p/0`} className="genre-link">
                    { props.category?.name }
                </NavLink>
            </div>
        </div>
    );
}

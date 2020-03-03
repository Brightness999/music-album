import React from 'react';

interface Props {
    title: string;
}

export default function GenreTitleHeader(props: Props) {
    return (
        <div className="album-title-header">
            <div>{ props.title }</div>
        </div>
    );
}

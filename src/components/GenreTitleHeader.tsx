import React from 'react';

interface IProps {
    title: string;
}

export default function GenreTitleHeader(props: IProps) {
    return (
        <div className="album-title-header">
            <div>
                { props.title }
                </div>
        </div>
    );
}
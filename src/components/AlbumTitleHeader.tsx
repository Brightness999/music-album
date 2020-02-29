import React from 'react';

interface IProps {
    title: string;
    createdAt: string;
}

export default function AlbumTitleHeader(props: IProps) {
    return (
        <div className="album-title-header d-flex justify-content-between">
            <div>
                { props.title }
                </div>
            <div>
                { props.createdAt }
            </div>
        </div>
    );
}
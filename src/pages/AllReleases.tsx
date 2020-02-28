import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';

export default function AllReleases() {
    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">All releases</p>
                <div className="d-flex align-items-center">
                    <Button className="playback-control track-control"><FontAwesomeIcon icon={faThLarge} />&nbsp;&nbsp;Grid</Button>
                    <Button className="playback-control track-control"><FontAwesomeIcon icon={faThList} />&nbsp;&nbsp;List</Button>
                </div>
            </div>
            
        </div>
    );
}
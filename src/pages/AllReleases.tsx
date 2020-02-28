import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { setShowMode, SHOW_MODE, StoreState, selectShowMode } from "../store";
import { connect, ConnectedProps, useSelector, useDispatch } from 'react-redux';

export default function AllReleases() {
    const showMode = useSelector((state: StoreState) => state.showMode);
    const dispatch = useDispatch();
    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">All releases{'showMode: "'+showMode+'"'}</p>
                <div className="d-flex align-items-center">
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.GRID} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.GRID))}>
                        <FontAwesomeIcon icon={faThLarge} />&nbsp;&nbsp;Grid
                    </Button>
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.LIST} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.LIST))}>
                        <FontAwesomeIcon icon={faThList} />&nbsp;&nbsp;List
                    </Button>
                </div>
            </div>
            
        </div>
    );
}

import { Button } from 'reactstrap';
import { ShowMode } from '../redux/store';
import { setShowMode } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowMode } from '../redux/selectors';

interface Props {
    disableGridMode?: boolean;
}

export default function ShowModeSwitcher(props: Props) {
    const dispatch = useDispatch();
    const showMode = useSelector(selectShowMode);
    return (<div className="d-flex align-items-center">
        <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.GRID}
            disabled={ props.disableGridMode !== undefined && props.disableGridMode }
            onClick={() => dispatch && dispatch(setShowMode(ShowMode.GRID))}>
            <FontAwesomeIcon icon={faThLarge}/>&nbsp;&nbsp;Grid
        </Button>
        <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.LIST}
            onClick={() => dispatch && dispatch(setShowMode(ShowMode.LIST))}>
            <FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;List
        </Button>
    </div>);
}
import { Button } from 'reactstrap';
import { ShowMode } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectShowMode } from '../redux/selectors';
import { changeShowModeLink } from '../common';
import history from '../history';

interface Props {
    disableGridMode?: boolean;
}

export default function ShowModeSwitcher(props: Props) {
    const showMode = useSelector(selectShowMode);
    return (<div className="d-flex align-items-center">
        <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.GRID}
            disabled={ props.disableGridMode !== undefined && props.disableGridMode }
            onClick={() => {
                const newLink = changeShowModeLink(ShowMode.GRID);
                history.push(newLink);
            }}>
            <FontAwesomeIcon icon={faThLarge}/>&nbsp;&nbsp;Grid
        </Button>
        <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.LIST}
            onClick={() => {
                const newLink = changeShowModeLink(ShowMode.LIST);
                history.push(newLink);
            }}>
            <FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;List
        </Button>
    </div>);
}
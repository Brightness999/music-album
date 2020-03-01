import React from 'react';
import {Track} from "../models";
import {Button} from "reactstrap";
import {formatFilesize} from "../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    track?: Track;
    className?: string;
    type: string; // mp3|flac
}

export default function DownloadButton(props: IProps) {
    const download = () => {
        window.location.href = `https://localhost:8000/download/track/before/${props.track?.slug}/as/${props.type}`;
    };
    return (<Button className={"download-button w-100 "+props.className} disabled={props.track === undefined} onClick={() => download()}>
            .{props.type} ({formatFilesize(props.track?.filesize)})&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}/>
        </Button>);
}
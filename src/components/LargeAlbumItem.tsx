import React from 'react';
import {NavLink} from 'react-router-dom';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import {Album, AlbumResponse} from '../models';
import axios, {AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {setPlayList} from "../store";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IProps {
    album: Album;
}

export default function LargeAlbumItem(props: IProps) {
    const dispatch = useDispatch();
    return (
        <Card>
            <div
                onClick={() => {
                    const fetchData = async () => {
                        const result: AxiosResponse<AlbumResponse> = await axios(`/api/album/${props.album.slug}`);
                        const play_list = result.data.album.tracks.map(track => track.slug);
                        dispatch(setPlayList(play_list));
                    };
                    fetchData();

                }}
                className="position-relative d-flex"
            >
                <CardImg top
                         src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`}
                         alt="album"
                />
                <div className="album-cover d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={ faPlay }/>
                </div>
            </div>
            <CardBody>
                <CardTitle><NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink></CardTitle>
                <CardSubtitle>{props.album.artist.name}</CardSubtitle>
                <CardText>{props.album.publisher.name}</CardText>
            </CardBody>
        </Card>
    );
}
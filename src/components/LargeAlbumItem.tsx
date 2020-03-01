import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import {Album, AlbumResponse, Track} from '../models';
import axios, {AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {setCurrentTrack, setPlayList} from "../store";

interface IProps {
    album: Album;
}

export default function LargeAlbumItem(props: IProps) {
    const dispatch = useDispatch();
    return (
        <Card>
            <CardImg top
                     src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`}
                     alt="album"
                     onClick={() => {
                         const fetchData = async () => {
                             const result: AxiosResponse<AlbumResponse> = await axios(`/api/album/${props.album.slug}`);
                             const play_list = result.data.album.tracks.map(track => track.slug);
                             dispatch(setPlayList(play_list));
                         };
                         fetchData();

                     }}
            />
            <CardBody>
                <CardTitle><NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink></CardTitle>
                <CardSubtitle>{props.album.catalog}</CardSubtitle>
                <CardText>{props.album.artist.name}</CardText>
            </CardBody>
        </Card>
    );
}
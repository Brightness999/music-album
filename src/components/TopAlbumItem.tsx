import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios, {AxiosResponse} from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

import {Album, DetailAlbumResponse} from '../models';
import {setPlayList} from '../redux/actions';

interface IProps {
    album: Album;
}

export default function TopAlbumItem(props: IProps) {
    const dispatch = useDispatch();
    return (
        <div className="top-album-item pt-1 pb-1 pl-3">
            <div
                onClick={() => {
                    const fetchData = async () => {
                        const result: AxiosResponse<DetailAlbumResponse> = await axios(`/api/album/${props.album.slug}`);
                        const play_list = result.data.album.tracks.map(track => track.slug);
                        dispatch(setPlayList(play_list));
                    };
                    fetchData();

                }}
                className="img-wrapper position-relative d-flex"
            >
                <img src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`} alt="album"/>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center album-cover">
                    <FontAwesomeIcon icon={ faPlay }/>
                </div>
            </div>
            <div className="content ml-2">
                <div className="title">
                    <NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink>
                </div>
                <div className="desc">{props.album.artist.name}</div>
                <div className="desc">{props.album.publisher.name}</div>
            </div>
        </div>
    );
}
import React from 'react';
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollArea from 'react-scrollbar';
import { faThLarge, faThList, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { setShowMode, SHOW_MODE, StoreState, selectShowMode } from "../store";
import { useSelector, useDispatch } from 'react-redux';
import LargeAlbumItem from '../components/LargeAlbumItem';
import { scrollbarStyles } from '../consts';

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const dispatch = useDispatch();
    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">All releases</p>
                <div className="d-flex align-items-center">
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.GRID} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.GRID))}>
                        <FontAwesomeIcon icon={faThLarge} />&nbsp;&nbsp;Grid
                    </Button>
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.LIST} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.LIST))}>
                        <FontAwesomeIcon icon={faThList} />&nbsp;&nbsp;List
                    </Button>
                </div>
            </div>
            <div className="album-content">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    <div className="d-flex flex-wrap">
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                    </div>
                </ScrollArea>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <Pagination size="sm">
                    <PaginationItem>
                        <PaginationLink previous href="#">
                            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        3
                        </PaginationLink>
                    </PaginationItem>
                    ...
                    <PaginationItem>
                        <PaginationLink href="#">
                        67
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        68
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        69
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#">
                        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );
}

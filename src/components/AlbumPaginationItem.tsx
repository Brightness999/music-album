import React, { useEffect } from 'react';
import { PaginationItem, PaginationLink } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectCurrentPage, selectPageCount } from '../redux/selectors';
import { composePageLink } from '../common';
import history from '../history';

interface Props {
    pageNumber: number;
}

export default function AlbumPaginationItem(props: Props) {
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);
    const loc = history.location;
    const pathName = loc.pathname;
    const newPath = composePageLink(pathName, pageCount, props.pageNumber);
    return (<PaginationItem active={props.pageNumber === currentPage}>
        <PaginationLink href={newPath}>{props.pageNumber+1}</PaginationLink>
    </PaginationItem>);
}

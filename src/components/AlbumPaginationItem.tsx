import React from 'react';
import { PaginationItem, PaginationLink } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/actions';
import { selectCurrentPage } from '../redux/selectors';

interface Props {
    pageNumber: number;
}

export default function AlbumPaginationItem(props: Props) {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    return (<PaginationItem active={props.pageNumber === currentPage}>
        <PaginationLink onClick={() => dispatch && dispatch(setCurrentPage(props.pageNumber))}>{props.pageNumber+1}</PaginationLink>
    </PaginationItem>);
}

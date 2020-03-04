import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectPageCount } from '../redux/selectors';
import AlbumPaginationItem from './AlbumPaginationItem';
import { setCurrentPage } from '../redux/actions';

export default function AlbumPagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);
    let pagenumArray;
    // '-1' is for '...'
    if (pageCount === 1) {
        pagenumArray = [0];
    } else if (pageCount <= 7) {
        pagenumArray = Array(pageCount).fill(0).map((v, i) => i);
    } else {
        if (currentPage <= 1) {
            pagenumArray = [0, 1, 2, -1, pageCount - 1];
        } else if (currentPage <= 2) {
            pagenumArray = [0, currentPage - 1, currentPage, currentPage + 1, -1, pageCount - 1];
        } else if (currentPage <= pageCount - 4) {
            pagenumArray = [0, -1, currentPage - 1, currentPage, currentPage + 1, -1, pageCount - 1];
        } else if (currentPage <= pageCount - 3) {
            pagenumArray = [0, -1, currentPage - 1, currentPage, currentPage + 1, pageCount - 1];
        } else {
            pagenumArray = [0, -1, pageCount - 3, pageCount - 2, pageCount - 1];
        }
    }
    return (
        <Pagination size="sm">
            {
                currentPage !== 0 ?
                    (<PaginationItem>
                        <PaginationLink
                            previous
                            onClick={() => dispatch && dispatch(setCurrentPage(currentPage - 1))}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </PaginationLink>
                    </PaginationItem>):<div/>
            }
            {
                pagenumArray.map((pageNum, index) => pageNum === -1 ? <div key={index}>...</div> : <AlbumPaginationItem pageNumber={pageNum} key={index}/>)
            }
            {
                currentPage < pageCount-1?
                    (<PaginationItem>
                        <PaginationLink
                            next
                            onClick={() => dispatch && dispatch(setCurrentPage(currentPage + 1))}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </PaginationLink>
                    </PaginationItem>):<div/>
            }
        </Pagination>
    );
}

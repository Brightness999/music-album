import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectCurrentPage, selectPageCount } from '../redux/selectors';
import AlbumPaginationItem from './AlbumPaginationItem';
import history from '../history';
import { composeNextPageLink, composePreviousPageLink } from '../common';

export default function AlbumPagination() {
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);
    let pageNumArray;
    // '-1' is for '...'
    if (pageCount === 1) {
        pageNumArray = [0];
    } else if (pageCount <= 7) {
        pageNumArray = Array(pageCount).fill(0).map((v, i) => i);
    } else {
        if (currentPage <= 1) {
            pageNumArray = [0, 1, 2, -1, pageCount - 1];
        } else if (currentPage <= 2) {
            pageNumArray = [0, currentPage - 1, currentPage, currentPage + 1, -1, pageCount - 1];
        } else if (currentPage <= pageCount - 4) {
            pageNumArray = [0, -1, currentPage - 1, currentPage, currentPage + 1, -1, pageCount - 1];
        } else if (currentPage <= pageCount - 3) {
            pageNumArray = [0, -1, currentPage - 1, currentPage, currentPage + 1, pageCount - 1];
        } else {
            pageNumArray = [0, -1, pageCount - 3, pageCount - 2, pageCount - 1];
        }
    }
    return (
        <Pagination size="sm">
            {
                currentPage !== 0 ?
                    (<PaginationItem>
                        <PaginationLink
                            previous
                            onClick={() => {
                                const loc = history.location;
                                const pathName = loc.pathname;
                                history.push(composePreviousPageLink(pathName, pageCount));
                            }}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </PaginationLink>
                    </PaginationItem>):<div/>
            }
            {
                pageNumArray.map((pageNum, index) => pageNum === -1 ? <div key={index}>...</div> : <AlbumPaginationItem pageNumber={pageNum} key={index}/>)
            }
            {
                currentPage < pageCount-1?
                    (<PaginationItem>
                        <PaginationLink
                            next
                            onClick={() => {
                                const loc = history.location;
                                const pathName = loc.pathname;
                                const newPath = composeNextPageLink(pathName, pageCount);
                                history.push(newPath);
                            }}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </PaginationLink>
                    </PaginationItem>):<div/>
            }
        </Pagination>
    );
}

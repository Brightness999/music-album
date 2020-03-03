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

export default function AlbumPagination() {
    return (
        <Pagination size="sm">
            <PaginationItem>
                <PaginationLink previous href="#">
                    <FontAwesomeIcon icon={ faChevronLeft } />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            ...
            <PaginationItem>
                <PaginationLink href="#">67</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">68</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">69</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#">
                    <FontAwesomeIcon icon={ faChevronRight } />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}
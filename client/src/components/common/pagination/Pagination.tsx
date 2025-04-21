import React from 'react';
import styles from './pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const DOTS = '...';
    const siblingCount = 1;
    const totalPageNumbers = siblingCount * 2 + 5;

    const getPages = () => {
        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i);
        }

        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPages - 1;

        const firstPage = 0;
        const lastPage = totalPages - 1;

        const pages: (number | string)[] = [];

        pages.push(firstPage);
        if (showLeftDots) pages.push(DOTS);

        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i);
        }

        if (showRightDots) pages.push(DOTS);
        pages.push(lastPage);

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage <= 0}
                onClick={() => onPageChange(currentPage - 1)}
                className={styles.arrow}
            >
                &#x276E;
            </button>

            {getPages().map((page, index) => (
                <button
                    key={index}
                    disabled={page === DOTS}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`${styles.page} ${page === currentPage ? styles.active : ''} ${page === DOTS ? styles.dots : ''}`}
                >
                   {typeof page === 'number' ? page + 1 : DOTS}
                </button>
            ))}

            <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
                className={styles.arrow}
            >
                &#x276F;
            </button>
        </div>
    );
};

export default Pagination;
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PAGE_COUNT_EVT_NAME, PAGE_EVT_NAME } from "../utils/Constants";
import styles from '../styles/style.module.css';

type Selection = {
    selected: number
}

export default function PaginationComponent() {

    const [pageCount, setPageCount] = useState(1);

    const onPageChange = (selectedItem: Selection) => {
        const customEvent = new CustomEvent(PAGE_EVT_NAME, { detail: selectedItem.selected + 1 });
        window.dispatchEvent(customEvent)
    };

    useEffect(() => {

        const onPageCountChanged = (event: CustomEventInit<number>) => {
            setPageCount(event.detail ?? -1);
        };

        window.addEventListener(PAGE_COUNT_EVT_NAME, onPageCountChanged);

        return () => {
            window.removeEventListener(PAGE_COUNT_EVT_NAME, onPageCountChanged);
        }
    }, []);

    return (
        <ReactPaginate pageCount={pageCount} marginPagesDisplayed={2} pageRangeDisplayed={3} activeClassName={styles.active} onPageChange={onPageChange}></ReactPaginate>
    )
}

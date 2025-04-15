import ReactPaginate from 'react-paginate';
import './App.css'
import UserListComponent from './UserListComponent';
import { PAGE_COUNT_EVT_NAME, PAGE_EVT_NAME } from './utils/Constants';
import { useEffect, useState } from 'react';

type Selection = {
  selected: number
}

function App() {
  const [pageCount, setPageCount] = useState(0);

  const onPageChange = (selectedItem: Selection) => {
    console.log(selectedItem.selected + 1);
    const customEvent = new CustomEvent(PAGE_EVT_NAME, { detail: selectedItem.selected + 1 });
    window.dispatchEvent(customEvent);
  };

  useEffect(() => {
    const onPageCountChanged = (event: CustomEventInit<number>) => {
      console.log("onPageCountChanged: ", event.detail);
      setPageCount(event.detail ?? -1);
    };

    window.addEventListener(PAGE_COUNT_EVT_NAME, onPageCountChanged);

    return () => {
      window.removeEventListener(PAGE_COUNT_EVT_NAME, onPageCountChanged);
    }
  }, [pageCount]);


  return (
    <>
      <UserListComponent></UserListComponent>
      <ReactPaginate pageCount={pageCount} marginPagesDisplayed={2} pageRangeDisplayed={3} activeClassName='active' onPageChange={onPageChange}></ReactPaginate>
    </>
  )
}

export default App

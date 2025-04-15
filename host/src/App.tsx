import { Suspense, lazy, useEffect, useState } from 'react';
import Search from './Search';
import ReactPaginate from 'react-paginate';
import { PAGE_COUNT_EVT_NAME, PAGE_EVT_NAME } from './utils/Constants';

type Selection = {
  selected: number
}

const UserListComponent = lazy(() => import('listado/UserListComponent'));

function App() {

  const [pageCount, setPageCount] = useState(1);
  const onPageChange = (selectedItem: Selection) => {
    console.log(selectedItem.selected + 1);
    const customEvent = new CustomEvent(PAGE_EVT_NAME, { detail: selectedItem.selected + 1 });
    window.dispatchEvent(customEvent)
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
  }, []);

  return (
    <div>
      <h1>Character List</h1>
      <Search></Search>

      <Suspense fallback={<div>Cargando personajes...</div>}>
        <UserListComponent />
      </Suspense>

      <Suspense fallback={<div>Cargando personajes...</div>}>
        <ReactPaginate pageCount={pageCount} marginPagesDisplayed={2} pageRangeDisplayed={3} activeClassName='active' onPageChange={onPageChange}></ReactPaginate>
      </Suspense>
    </div>
  );
}

export default App;

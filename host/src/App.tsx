import { Suspense, lazy } from 'react';
import Search from './components/Search';


const UserListComponent = lazy(() => import('listado/UserListComponent'));
const PaginationComponent = lazy(() => import('pagination/PaginationComponent'));

function App() {

  return (
    <div>
      <h1>Character List</h1>
      <Search></Search>

      <Suspense fallback={<div>Cargando personajes...</div>}>
        <UserListComponent />
      </Suspense>


      <Suspense fallback={<div>Cargando pagination...</div>}>
        <PaginationComponent />
      </Suspense>
    </div>
  );
}

export default App;

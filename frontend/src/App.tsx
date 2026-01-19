import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
// import CreateUser from './pages/users/CreateUser';
// import UserDetails from './pages/users/UserDetails';
import Items from './pages/items/Items';
// import CreateItem from './pages/items/CreateItem';
// import ItemDetails from './pages/items/ItemDetails';
import NotFound from './pages/NotFound';
import { ProtectedLayout } from './auth/protected-layout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        {/* <Route path="/users/create" element={<CreateUser />} /> */}
        {/* <Route path="/users/:id" element={<UserDetails />} /> */}
        <Route path="/items" element={<Items />} />
        {/* <Route path="/items/create" element={<CreateItem />} /> */}
        {/* <Route path="/items/:id" element={<ItemDetails />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

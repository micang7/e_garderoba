import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import CreateUser from './pages/users/CreateUser';
import UserDetails from './pages/users/UserDetails';
import Items from './pages/items/Items';
import CreateItem from './pages/items/CreateItem';
import ItemDetails from './pages/items/ItemDetails';
import Events from './pages/events/Events';
import CreateEvent from './pages/events/CreateEvent';
import EventDetails from './pages/events/EventDetails';
import NotFound from './pages/NotFound';
import ProtectedLayout from './auth/ProtectedLayout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="users">
          <Route index element={<Users />} />
          <Route path="create" element={<CreateUser />} />
          <Route path=":id" element={<UserDetails />} />
        </Route>

        <Route path="items">
          <Route index element={<Items />} />
          <Route path="create" element={<CreateItem />} />
          <Route path=":id" element={<ItemDetails />} />
        </Route>

        <Route path="events">
          <Route index element={<Events />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path=":id" element={<EventDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

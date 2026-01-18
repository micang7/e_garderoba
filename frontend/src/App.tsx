import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { ProtectedLayout } from './auth/protected-layout';

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route element={<ProtectedLayout />}>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

import LayoutUser from '@/layouts/user';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import Books from '@/pages/books';
import Customer from '@/pages/customers';
import Login from '@/pages/login';
import Soon from '@/pages/soon';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthMiddleware />}>
        <Route element={<LayoutUser />}>
          <Route path="/" element={<Soon />} />
          <Route path="/books" element={<Books />} />
          <Route path="/customers" element={<Customer />} />

          <Route path="/*" element={<Soon />} />
        </Route>


      </Route>
    </Route>
  )
);

export default router;

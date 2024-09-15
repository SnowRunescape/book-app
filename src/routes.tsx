import LayoutUser from '@/layouts/user';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import Books from '@/pages/books';
import BookCreate from '@/pages/books/create';
import Customer from '@/pages/customers';
import Login from '@/pages/login';
import Soon from '@/pages/soon';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import CustomerCreate from './pages/customers/create';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthMiddleware />}>
        <Route element={<LayoutUser />}>
          <Route path="/" element={<Soon />} />

          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<BookCreate />} />

          <Route path="/customers" element={<Customer />} />
          <Route path="/customers/create" element={<CustomerCreate />} />

          <Route path="/*" element={<Soon />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;

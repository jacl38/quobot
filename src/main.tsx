import ReactDOM from 'react-dom/client';
import MainLayout from './MainLayout.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthorPage from './Pages/AuthorPage.tsx';
import SearchPage from './Pages/SearchPage.tsx';
import HomePage from './Pages/HomePage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
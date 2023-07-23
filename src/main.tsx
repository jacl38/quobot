import './index.css';
import ReactDOM from 'react-dom/client';
import MainLayout from './MainLayout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './Pages/SearchPage.tsx';
import HomePage from './Pages/HomePage.tsx';
import TagPage from './Pages/TagPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/author/:id" element={<AuthorPage />} /> */}
        <Route path="/tag/:id" element={<TagPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
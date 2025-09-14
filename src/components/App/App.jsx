// import style from './App.module.css'
import "modern-normalize";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
import Header from "../Header/Header";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() => import('../../pages/CarDetailsPage/CarDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

function App() {

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path='/catalog' element={ <CatalogPage /> } />
          <Route path='/cars/:id' element={ <CarDetailsPage /> } />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

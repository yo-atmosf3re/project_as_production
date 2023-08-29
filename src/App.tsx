import React, { Suspense, useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './styles/index.scss';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

const App = () => {

   const { theme, toggleTheme } = useTheme();

   return (
      <div className={classNames('app', {}, [theme])}>
         <Link to={'/'}>Главная</Link>
         <Link to={'/about'}>О сайте</Link>
         <button
            className='button-tggltheme'
            onClick={toggleTheme}>
            Change theme
         </button>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path={'/about'} element={<AboutPageAsync />} />
               <Route path={'/'} element={<MainPageAsync />} />
            </Routes>
         </Suspense>
      </div>
   )
}

classNames('button', { 'hovered': false, 'active': true, 'press': false }, ['active', 'red'])

export default App;
// App.js
import React from 'react';
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Login from './Login';
import MoviesList from './MovieList';
import MovieView from './MovieView';

// lets create the router

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/movies',
    element: <div><MoviesList/></div>
  },
  {
    path: '/movie/:id',
    element: <div><MovieView/></div>
  }
]);


function App() {
  return (
    <main>
      <RouterProvider router={router}/>
    </main>
    
  );
}

export default App;
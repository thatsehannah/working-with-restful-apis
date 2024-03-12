import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { PostsPage } from './posts/PostsPage';
import { getPosts } from './posts/getPosts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />,
    loader: getPosts,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

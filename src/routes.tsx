import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;

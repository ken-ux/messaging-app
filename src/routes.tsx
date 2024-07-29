import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

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
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routes;

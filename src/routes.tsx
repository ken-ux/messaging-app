import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "message",
        element: <MessagePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routes;

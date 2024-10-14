import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import { auth } from "./utils";

function App() {
  const navigate = useNavigate();
  const [loggedIn, isLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    // Check for token.
    if (!token) {
      navigate("/login");
    }

    if (token) {
      auth().then((val) => {
        if (val) {
          isLoggedIn(true);
        } else {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      });
    }

    return () => {
      token = null;
    };
  }, [navigate]);

  return loggedIn ? (
    <div className="flex bg-slate-50">
      <Nav />
      <main className="m-6 flex w-full">
        {/* <ContentWrapper> */}
        <Outlet />
        {/* </ContentWrapper> */}
      </main>
    </div>
  ) : (
    <div className="bg-indigo-500 p-5 text-white">App loading...</div>
  );
}

export default App;

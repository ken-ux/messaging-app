import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Nav from "./components/Nav";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    // Check for token.
    if (!token) {
      navigate("/login");
    }

    // Check if token is valid.
    const auth = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "/auth";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ username: localStorage.getItem("user") }),
        });

        const valid = await response.json();
        if (!valid) {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };

    if (token) {
      auth();
    }

    return () => {
      token = null;
    };
  }, [navigate]);

  return (
    <div className="flex">
      <Nav />
      <main className="mx-auto">
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </main>
    </div>
  );
}

export default App;

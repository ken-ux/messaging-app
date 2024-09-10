import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils";

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Extend typing to prevent errors when accessing values.
    const elements = e.currentTarget.elements as HTMLFormControlsCollection & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    // Get values and store in object.
    const formData = {
      username: elements["username"].value,
      password: elements["password"].value,
    };

    // Send POST request to backend.
    try {
      const url = import.meta.env.VITE_API_URL + "/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setErrorMessage("Success! Redirecting to the homepage.");
        const jwt = await response.json();
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", formData.username);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const message = await response.text();
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage(
        "Error processing your request, try again or contact site owner.",
      );
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      auth().then((val) => {
        if (val) {
          navigate("/");
        }
      });
    }

    return () => {
      token = null;
    };
  }, [navigate]);

  return (
    <main>
      <form
        onSubmit={(e) => formHandler(e)}
        className="test-border mx-auto flex max-w-xl flex-col items-center"
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            pattern="[a-zA-Z0-9]+"
            minLength={5}
            maxLength={20}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            minLength={5}
            maxLength={20}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            autoComplete="new-password"
            minLength={5}
            maxLength={20}
            required
          />
        </div>
        <button type="submit" className="bg-slate-500">
          Register
        </button>
        <p>{errorMessage}</p>
        <p>
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;

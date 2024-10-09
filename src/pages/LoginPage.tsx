import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils";

function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

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
      const url = import.meta.env.VITE_API_URL + "/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setValid(true);
        setMessage("Success! Redirecting to the homepage.");
        const jwt = await response.json();
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", formData.username);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const message = await response.text();
        setValid(false);
        setMessage(message);
        setDisabled(false);
      }
    } catch (error) {
      setValid(false);
      setMessage(
        "Error processing your request, try again later or contact site owner.",
      );
      setDisabled(false);
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
    <main className="m-5">
      <form
        onSubmit={(e) => formHandler(e)}
        className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded bg-indigo-500 p-5 text-white"
      >
        <h1 className="my-2 text-3xl">StarSend</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              maxLength={20}
              autoComplete="username"
              required
              className="text-input text-black"
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              maxLength={20}
              autoComplete="current-password"
              required
              className="text-input text-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className={
            "rounded bg-indigo-700 px-2 py-1 " +
            (disabled && "bg-indigo-300 text-indigo-400")
          }
          disabled={disabled}
        >
          Login
        </button>
        {message && (
          <div
            className={
              "flex items-center gap-2 rounded px-2 py-1 font-medium " +
              (valid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700")
            }
          >
            {valid ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5" />
            )}
            <p>{message}</p>
          </div>
        )}
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
          .
        </p>
      </form>
    </main>
  );
}

export default LoginPage;

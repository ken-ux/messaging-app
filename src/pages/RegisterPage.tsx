import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils";

function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    if (!passwordsMatch) {
      return;
    }

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
      const url = import.meta.env.VITE_API_URL + "/auth/register";
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
        setMessage(message);
        setDisabled(false);
      }
    } catch (error) {
      setMessage(
        "Error processing your request, try again or contact site owner.",
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
              autoComplete="username"
              pattern="[a-zA-Z0-9]+"
              minLength={5}
              maxLength={20}
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
              autoComplete="new-password"
              minLength={5}
              maxLength={20}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="text-input text-black"
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="confirm_password">Re-enter Password</label>
            <input
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              minLength={5}
              maxLength={20}
              required
              onChange={(e) => {
                if (e.target.value !== password) {
                  setPasswordsMatch(false);
                  setMessage("Passwords do not match.");
                } else {
                  setPasswordsMatch(true);
                  setMessage("");
                }
              }}
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
          Register
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
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
          .
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;

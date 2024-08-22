import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
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
      const url = import.meta.env.VITE_API_URL + "/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setErrorMessage("Success!");
        // const jwt = await response.json();
        // localStorage.setItem("token", jwt);
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
            maxLength={20}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            maxLength={20}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className="bg-slate-500">
          Login
        </button>
        <p>{errorMessage}</p>
        <p>
          Don't have an account? <Link to="/register">Register</Link>.
        </p>
      </form>
    </main>
  );
}

export default LoginPage;

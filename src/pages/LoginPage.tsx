import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main>
      <form
        action=""
        className="test-border mx-auto flex max-w-xl flex-col items-center"
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="bg-slate-500">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>.
        </p>
      </form>
    </main>
  );
}

export default LoginPage;

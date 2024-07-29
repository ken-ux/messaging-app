import { Link } from "react-router-dom";

function RegisterPage() {
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
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="bg-slate-500">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;

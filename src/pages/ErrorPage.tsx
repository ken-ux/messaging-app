import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="rounded bg-indigo-100 px-4 py-2 text-2xl text-indigo-700">
        Error 404: Page does not exist.
      </h1>
      <Link to="/" className="text-lg text-indigo-500 underline">
        Go to home page.
      </Link>
    </main>
  );
}

export default ErrorPage;

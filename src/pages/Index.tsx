import { Link } from "react-router-dom";

function Index() {
  const user = localStorage.getItem("user");

  return (
    <div className="page flex flex-col gap-2 self-start p-6 transition-all hover:shadow-md">
      <p className="text-2xl">
        Hi, <span className="font-semibold">{user}</span>! 👋
      </p>
      <p>Here's some things you can do while you're here:</p>
      <ul className="list-inside list-disc">
        <li>
          <Link
            to="/search"
            className="text-indigo-500 underline transition-all hover:text-indigo-400"
          >
            Find a friend to message
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-indigo-500 underline transition-all hover:text-indigo-400"
          >
            Customize your profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;

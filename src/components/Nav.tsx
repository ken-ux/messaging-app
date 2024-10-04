import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  PencilSquareIcon as SolidPencilSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [recentOpen, setRecentOpen] = useState(true);
  const [recents, setRecents] = useState(localStorage.getItem("recents"));
  const [hover, setHover] = useState(false);

  let listItems = <li>Empty. Try messaging someone!</li>;

  if (recents) {
    const recentsArray = JSON.parse(recents);
    listItems = recentsArray.map((user: string) => {
      return (
        <li
          className="rounded-md transition-all duration-150 hover:bg-indigo-600"
          key={user}
        >
          <Link to={`/message/${user}`} className="flex px-2 py-1">
            {user}
          </Link>
        </li>
      );
    });
  }

  useEffect(() => {
    const localStorageChange = () => {
      setRecents(localStorage.getItem("recents"));
    };
    window.addEventListener("storage", localStorageChange);
    return () => window.removeEventListener("storage", localStorageChange);
  }, []);

  return (
    <nav className="flex min-h-screen w-48 flex-col justify-between bg-indigo-500 p-6 text-white">
      <div>
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-2xl font-semibold">StarSend</h1>
          <SparklesIcon className="h-7 w-7 text-indigo-200" />
        </Link>
        <Link
          to="/search"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="mt-4 flex items-center gap-1"
        >
          {hover ? (
            <SolidPencilSquareIcon className="h-6 w-6 text-indigo-200" />
          ) : (
            <PencilSquareIcon className="h-6 w-6 text-indigo-200" />
          )}
          <h2 className="text-lg font-semibold">New Chat</h2>
        </Link>
        <div
          className="mb-1 mt-4 flex items-center hover:cursor-pointer"
          onClick={() => setRecentOpen(!recentOpen)}
        >
          <h2 className="text-lg font-semibold">Recent</h2>
          {recentOpen ? (
            <ChevronDownIcon className="h-7 w-7 text-indigo-200" />
          ) : (
            <ChevronRightIcon className="h-7 w-7 text-indigo-200" />
          )}
        </div>

        {recentOpen && <ul>{listItems}</ul>}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
        <Link to="/settings" className="row-span-2">
          <h2 className="flex aspect-square items-center justify-center rounded-full bg-slate-700 transition-all hover:bg-slate-600">
            {localStorage.getItem("user")?.charAt(0).toUpperCase()}
          </h2>
        </Link>

        <Link to="/settings" className="h-7 w-7">
          <Cog6ToothIcon className="transition-all hover:text-indigo-200" />
        </Link>
        <Link
          className="flex items-center justify-center font-semibold transition-all hover:text-indigo-200"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("recents");
          }}
          to="/login"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

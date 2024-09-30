import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  PlusCircleIcon as SolidPlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [recentOpen, setRecentOpen] = useState(true);
  const [recents, setRecents] = useState(localStorage.getItem("recents"));
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // const recents = localStorage.getItem("recents");
  let listItems = "Empty. Try messaging someone!";

  if (recents) {
    const recentsArray = JSON.parse(recents);
    listItems = recentsArray.map((user: string) => {
      return (
        <li key={user}>
          <Link to={`/message/${user}`}>{user}</Link>
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
    <nav className="flex min-h-screen w-48 flex-col justify-between bg-red-200 p-6">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-semibold">Sidebar</h1>
        </Link>
        <div className="mt-4 flex items-center gap-1">
          <h2 className="text-xl font-semibold">New Chat</h2>
          <Link
            to="/search"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? (
              <SolidPlusCircleIcon className="h-7 w-7" />
            ) : (
              <PlusCircleIcon className="h-7 w-7" />
            )}
          </Link>
        </div>
        <div
          className="mt-4 flex items-center hover:cursor-pointer"
          onClick={() => setRecentOpen(!recentOpen)}
        >
          <h2 className="text-xl font-semibold">Recent</h2>
          {recentOpen ? (
            <ChevronDownIcon className="h-7 w-7" />
          ) : (
            <ChevronRightIcon className="h-7 w-7" />
          )}
        </div>

        {recentOpen && <ul>{listItems}</ul>}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
        <Link to="/settings" className="row-span-2">
          <h2 className="flex aspect-square items-center justify-center rounded-full bg-black text-white">
            {localStorage.getItem("user")?.charAt(0).toUpperCase()}
          </h2>
        </Link>

        <Link to="/settings" className="h-7 w-7">
          <Cog6ToothIcon />
        </Link>
        <h2
          className="flex items-center justify-center font-semibold"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("recents");
            navigate("/login");
          }}
        >
          Logout
        </h2>
      </div>
    </nav>
  );
}

export default Nav;

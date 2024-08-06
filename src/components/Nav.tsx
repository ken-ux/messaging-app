import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  PlusCircleIcon as SolidPlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [recentOpen, setRecentOpen] = useState(true);
  const [hover, setHover] = useState(false);

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

        {recentOpen && (
          <ul>
            <Link to="/message/fake">Fake User</Link>
            <li>Placeholder</li>
            <li>Placeholder</li>
          </ul>
        )}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
        <h2 className="test-border row-span-2 flex aspect-square items-center justify-center rounded-full">
          You
        </h2>
        <Link to="/settings" className="h-7 w-7">
          <Cog6ToothIcon />
        </Link>
        <h2 className="flex items-center justify-center font-semibold">
          Logout
        </h2>
      </div>
    </nav>
  );
}

export default Nav;

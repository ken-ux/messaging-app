import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import Profile from "../components/Profile";

function SearchPage() {
  const [searchResults, setSearchResults] = useState<
    { username: string }[] | null
  >(null);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);

  const formHandler = useDebouncedCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const element = e.target as HTMLInputElement;
      let searchQuery = element.value;
      searchQuery = searchQuery.trim();

      if (searchQuery !== "") {
        try {
          const url = import.meta.env.VITE_API_URL + "/search?username=";
          const response = await fetch(url + searchQuery);
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setSearchResults(null);
      }
    },
    300,
  );

  return (
    <div className="flex gap-2">
      <div className="page min-w-80 p-6">
        <form
          onChange={(e) => formHandler(e)}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xl font-semibold">
              Search Users
            </label>
            <input
              type="text"
              id="username"
              name="username"
              pattern="[a-zA-Z0-9]+"
              className="text-input"
            />
          </div>
        </form>
        <p className="mb-2 mt-6 text-xl font-semibold">Search Results</p>
        <ul className="flex flex-col gap-2">
          {searchResults !== null
            ? searchResults.map((user) => {
                return (
                  <li
                    key={user.username}
                    className="flex items-center justify-between"
                  >
                    <p>{user.username}</p>
                    <div className="flex gap-1">
                      <button
                        className="flex items-center gap-1 rounded bg-indigo-400 px-2 py-1 text-sm text-white transition-all hover:bg-indigo-500"
                        onClick={() => setProfileUsername(user.username)}
                      >
                        Profile
                        <UserCircleIcon className="h-5 w-5" />
                      </button>
                      <Link
                        to={"/message/" + user.username}
                        className="flex items-center gap-1 rounded bg-indigo-400 px-2 py-1 text-sm text-white transition-all hover:bg-indigo-500"
                      >
                        Message
                        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                      </Link>
                    </div>
                  </li>
                );
              })
            : "No Results"}
        </ul>
      </div>
      {profileUsername && (
        <Profile
          username={profileUsername}
          setProfileUsername={setProfileUsername}
        />
      )}
    </div>
  );
}

export default SearchPage;

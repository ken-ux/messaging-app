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
    <div>
      <form
        onChange={(e) => formHandler(e)}
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="username">Search for User</label>
          <input
            type="text"
            id="username"
            name="username"
            pattern="[a-zA-Z0-9]+"
          />
        </div>
      </form>
      <p className="mt-2">Search Results</p>
      <ul>
        {searchResults !== null
          ? searchResults.map((user) => {
              return (
                <li key={user.username} className="flex justify-between">
                  <p>{user.username}</p>
                  <div className="flex gap-1">
                    <button
                      className="test-border"
                      onClick={() => setProfileUsername(user.username)}
                    >
                      Profile
                    </button>
                    <Link
                      to={"/message/" + user.username}
                      className="test-border"
                    >
                      Message
                    </Link>
                  </div>
                </li>
              );
            })
          : "No Results"}
      </ul>
      {profileUsername && <Profile username={profileUsername} />}
    </div>
  );
}

export default SearchPage;

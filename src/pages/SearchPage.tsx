import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

function SearchPage() {
  const [searchResults, setSearchResults] = useState<
    { username: string }[] | null
  >(null);

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
      <form onChange={(e) => formHandler(e)}>
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
                <li key={user.username}>
                  <Link to={"/message/" + user.username}>{user.username}</Link>
                </li>
              );
            })
          : "No Results"}
      </ul>
    </div>
  );
}

export default SearchPage;

import { useState } from "react";
import { Link } from "react-router-dom";

function SearchPage() {
  const [searchResults, setSearchResults] = useState<
    { username: string }[] | null
  >(null);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const element = e.currentTarget.elements as HTMLFormControlsCollection & {
      username: HTMLInputElement;
    };
    const searchQuery = element["username"].value;
    try {
      const url = import.meta.env.VITE_API_URL + "/search?username=";
      const response = await fetch(url + searchQuery);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => formHandler(e)}>
        <div>
          <label htmlFor="username">Search for User</label>
          <input
            type="text"
            id="username"
            name="username"
            pattern="[a-zA-Z0-9]+"
          />
        </div>
        <button type="submit" className="bg-slate-100">
          Search
        </button>
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

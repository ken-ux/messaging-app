import { Link } from "react-router-dom";

function SearchPage() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="user">Search for User</label>
          <input type="text" id="user" name="user" />
        </div>
        <button type="submit" className="bg-slate-100">
          Search
        </button>
      </form>
      <p className="mt-2">Search Results</p>
      <ul>
        <li>
          <Link to="/message/fake">Fake User</Link>
        </li>
        <li>
          <Link to="/message/fake">Fake User</Link>
        </li>
        <li>
          <Link to="/message/fake">Fake User</Link>
        </li>
      </ul>
    </div>
  );
}

export default SearchPage;

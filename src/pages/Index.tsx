import { Link } from "react-router-dom";

function Index() {
  const user = localStorage.getItem("user");

  return (
    <div>
      <p>
        Hello, <span className="font-semibold">{user}</span>!
        <br />
        Here's some things you can do:
      </p>
      <ul className="list-inside list-disc">
        <li>
          <Link to="/search">Find a friend to message.</Link>
        </li>
        <li>
          <Link to="/settings">Customize your profile.</Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;

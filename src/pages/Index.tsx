function Index() {
  const user = localStorage.getItem("user");
  return (
    <div>
      <p>
        Hello, <span className="font-semibold">{user}</span>!
        <br />
        Here's some things you can do:
        <ul className="list-inside list-disc">
          <li>Find a friend to message.</li>
          <li>Customize your profile.</li>
        </ul>
      </p>
    </div>
  );
}

export default Index;

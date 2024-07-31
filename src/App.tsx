import { Outlet } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="flex">
      <Nav />
      <main className="mx-auto">
        <ContentWrapper>
          <p className="bg-blue-200 text-2xl">Main Content Below</p>
          <Outlet />
        </ContentWrapper>
      </main>
    </div>
  );
}

export default App;

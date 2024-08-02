import { Outlet } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="flex">
      <Nav />
      <main className="mx-auto">
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </main>
    </div>
  );
}

export default App;

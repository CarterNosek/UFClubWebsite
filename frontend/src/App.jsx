import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import useToken from "./services/useToken";

function App() {
  // const {token, setToken} = useToken();

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
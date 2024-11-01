import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import useToken from "./services/useToken";

function App() {
  // const {token, setToken} = useToken();

  return (
    <>
      <header>
        <MyNavbar />
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
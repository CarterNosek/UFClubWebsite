import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

function NotFound() {
  return (
    <div id="not-found-page">
      <h1>404 Not Found</h1>
      <LinkContainer to="/">
        <Button>Go to home page</Button>
      </LinkContainer>
    </div>
  );
}

export default NotFound;

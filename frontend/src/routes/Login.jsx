import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MyFormRow from "../components/MyFormRow";

function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div id="login-page">
      <h1>Login</h1>
      <Link to="/register"> Already have an account?</Link>
      <Form noValidate validated={validated} className="mt-3" onSubmit={handleSubmit}>
        <>
          <MyFormRow label="Username" controlAttrs={{required: true, type: "text"}} invalidMsg="Please enter a Username" />
          <MyFormRow label="Password" controlAttrs={{required: true, type: "password"}} invalidMsg="Please enter a Password" />
        </>
        <Button type="submit">Submit</Button>
      </Form>

    </div>
  );
}

export default Login;

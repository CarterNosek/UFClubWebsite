/* eslint-disable react/prop-types */

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function FormRow({
  label,
  controlAttrs,
  invalidMsg,
}) {

  return (
    <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId={"validation-" + label}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...controlAttrs} />
        <Form.Control.Feedback type="invalid">{invalidMsg}</Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}

export default FormRow;
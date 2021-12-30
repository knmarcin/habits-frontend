import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });

  return (
    <Container>
      <Col md={{ span: "6", offset: "3" }}>
        <Form
          style={{
            marginTop: "20px",
            border: "1px solid lightgray",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setRegisterData({ ...registerData, email: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your cool username"
              onChange={(e) => {
                setRegisterData({ ...registerData, username: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setRegisterData({ ...registerData, password: e.target.value });
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              fetch("http://127.0.0.1:8000/register/", {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...registerData,
                }),
              }).then((response) => {
                if (response.ok) {
                  document.location.href = "/dashboard";
                }
              });
            }}
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;

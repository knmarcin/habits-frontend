import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

async function loginUser(credentials) {
  return fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    if (data.status === 401) {
      alert("Nieprawidłowa kombinacja loginu i hasła");
      return data.json();
    } else {
      return data.json();
    }
  });
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState(localStorage.getItem("login"));
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
    if (username != null) {
      localStorage.setItem("login", username);
      setLoading(false);
      document.location.href = "/dashboard";
    }
  };

  return (
    <Container fluid="md" style={{ textAlign: "center" }}>
      <Col
        style={{ marginTop: "20vh" }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
        sm={{ span: 8, offset: 2 }}
        xs={{ span: 10, offset: 1 }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{
            padding: "20px",
            border: "1px solid lightgray",
            borderRadius: "15px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Login"
              value={username || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Hasło"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Zaloguj
          </Button>

          {loading === true && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Form>
      </Col>
    </Container>
  );
}

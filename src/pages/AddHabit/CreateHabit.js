import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import useToken from "../../auth/useToken";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import { useState } from "react";

const CreateHabit = () => {
  const [name, setName] = useState("");
  const { token } = useToken();

  return (
    <Container fluid="md">
      <Col xs={{ span: 4, offset: 4 }}>
        <Form
          style={{
            marginTop: "20px",
            border: "1px solid lightgray",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <Form.Group>
            <Form.Label>Habit's name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            style={{ marginTop: "20px" }}
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              fetch(`http://127.0.0.1:8000/habits/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                  name: name,
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

export default CreateHabit;

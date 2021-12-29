import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import useToken from "../../auth/useToken";

import { useState } from "react";

const CreateHabit = () => {
  const [name, setName] = useState("");
  const { token } = useToken();

  return (
    <div>
      <Form>
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
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("im doing my best!");
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
    </div>
  );
};

export default CreateHabit;

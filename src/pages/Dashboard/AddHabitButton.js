import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddHabitButton = () => {
  return (
    <Container>
      <Button
        variant="primary"
        onClick={(e) => {
          window.location.href = "/add";
        }}
      >
        Add habbit
      </Button>
    </Container>
  );
};

export default AddHabitButton;

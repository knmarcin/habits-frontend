import React from "react";
import Button from "react-bootstrap/Button";

const AddHabitButton = () => {
  return (
    <div>
      <Button
        variant="primary"
        onClick={(e) => {
          window.location.href = "/add";
        }}
      >
        Add habbit
      </Button>
    </div>
  );
};

export default AddHabitButton;

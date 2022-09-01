import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useEmployees } from "../../EmployeesContext";
import PropTypes from "prop-types";

const RatingCell = ({ employeeId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const { ratingEmployeeById } = useEmployees();

  const handleRatingOnChange = (event, newRating) => {
    ratingEmployeeById(employeeId, newRating);
    setRatingValue(newRating);
  };
  return (
    <Rating
      name="simple-controlled"
      value={ratingValue}
      onChange={handleRatingOnChange}
    />
  );
};

export default RatingCell;
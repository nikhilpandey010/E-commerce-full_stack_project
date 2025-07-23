import React from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Paginate = ({ page, pages, keyword = '' }) => {
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    // if (keyword) {
    //   navigate(`page/page=${value}`);
    // } else {
      navigate(`/?page=${value}`);
    // }
  };

  return (
    pages > 1 && (
      <Pagination
        count={pages}
        page={Number(page)}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    )
  );
};

export default Paginate;

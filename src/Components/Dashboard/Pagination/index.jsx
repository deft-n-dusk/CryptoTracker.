import React from 'react';
import "./style.css"
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationComponent( {page, handlePageChange}) {
  

  return (
    <div className='pagination-component'>
      
      <Pagination
       sx={{
        "& .MuiPaginationItem-text": {
          color: "#fff !important",
          border: "1px solid var(--grey)",
        },
        "& .MuiPaginationItem-text:hover": {
          backgroundColor: "transparent !important",
        },
        "& .Mui-selected  ": {
          backgroundColor: "var(--blue)",
          borderColor: "var(--blue)",
        },
        "& .MuiPaginationItem-ellipsis": {
          border: "none",
        },
      }}
       count={10}
       page={page} 
       onChange={(event, value) => handlePageChange(event, value)} />
    </div>
  );
}

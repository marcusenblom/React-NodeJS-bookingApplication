import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function EditBooking() {
  let { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:4000/edit/" + id).then(response => {
      console.log("hejsan");
    });
  });

  return (
    <React.Fragment>
      <div>Hello</div>
    </React.Fragment>
  );
}

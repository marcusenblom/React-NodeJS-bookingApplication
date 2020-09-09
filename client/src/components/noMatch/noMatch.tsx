import React from "react";
import Nav from "../nav/nav";

export default function NoMatch() {
  return (
    <React.Fragment>
      <Nav />
      <div>
          <h2>This URL is not available!</h2>
      </div>
    </React.Fragment>
  );
}

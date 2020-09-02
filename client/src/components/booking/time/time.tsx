import React, { useState, ChangeEvent, MouseEvent } from "react";
import Nav from "../../nav/nav";


interface ITimeProps {
  date: Date;
  people: number;
  sitting: number[];
  updateSitting(sitting: number[]): void;
}

export default function TimeComponent(props: ITimeProps) {
  function updateParent(e: any) {
    let s = parseInt(e.target.value);
    props.updateSitting([s]);
  }

  let sittingButtons = props.sitting.map((sitting: number) => {
    return (
      <div className="time-div" key={sitting}>
        <button
          className="time-btn"
          type="button"
          value={sitting}
          onClick={updateParent}
        >
          Time: {sitting}.00
        </button>
      </div>
    );
  });

  return (
    <React.Fragment>
      <Nav />
      <div>
        <hr />
        <p>
          {"Date: " + props.date.getDate()}/{props.date.getMonth() + 1}
        </p>
        <p>{"Guests: " + props.people}</p>
        {sittingButtons}
        <hr />
      </div>
    </React.Fragment>
  );
}

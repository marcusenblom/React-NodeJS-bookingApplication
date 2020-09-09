import React from "react";
import Nav from "../../nav/nav";
import { BsPeopleFill, BsCalendarFill } from "react-icons/bs";
import { FaArrowCircleLeft } from "react-icons/fa";

interface ITimeProps {
  date: Date;
  people: number;
  sitting: number[];
  updateSitting(sitting: number[]): void;
  setDateChosen(bool: boolean): void;
}

export default function TimeComponent(props: ITimeProps) {

  function updateDateChosen() {
    props.setDateChosen(false);
  }

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
      <div className="mb">
      <FaArrowCircleLeft size='2em' className='go-back-arrow' onClick={updateDateChosen} />
        <div className='flexe-these-two'>
          <p>
            <BsCalendarFill size='1.2em' className="calandar" />
            {"Date: " + props.date.getDate()}/{props.date.getMonth() + 1}
          </p>
          <p className='ml'>
          <BsPeopleFill size='1.2em'  className="people"/>
            {"Guests: " + props.people}
          </p>
        </div>
        {sittingButtons}
      </div>
    </React.Fragment>
  );
}

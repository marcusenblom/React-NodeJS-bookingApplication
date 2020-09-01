import React, { useState, ChangeEvent, MouseEvent} from 'react';
import './time.scss';


interface ITimeProps {
    date: Date,
    people: number,
    sitting: number[],
    updateSitting(sitting: number[]): void;
}

export default function TimeComponent(props: ITimeProps) {

    function updateParent(e: any){
        let s = parseInt(e.target.value);
        props.updateSitting([s]);
    }
    
    let sittingButtons = props.sitting.map((sitting: number) => {
        return (
          <div className="time-div">
            <button
              className="time-btn"
              type="button"
              value={sitting}
              key={sitting}
              onClick={updateParent}>
              Tid: {sitting}.00
            </button>
          </div>
        );
    });

    return (
        <div>
            <hr/>
            <p>{"Datum: " + props.date.getDate()}/{props.date.getMonth() + 1}</p>
            <p>{"People: " + props.people}</p>
            {sittingButtons}
            <hr/>
        </div>
    );
}            

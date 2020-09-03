import React, { useState } from "react";
//import "./popup.scss";

interface IContactProps {
  date: Date;
  people: number;
  sitting: number[];
  updateUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number
  ): void;
}

export default function Popup(props: IContactProps) {
  class userClass {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    constructor(
      fname: string,
      lname: string,
      email: string,
      phoneNumber: number
    ) {
      this.firstName = fname;
      this.lastName = lname;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [user, setUser] = useState(new userClass("", "", "", 0));

  return 
}

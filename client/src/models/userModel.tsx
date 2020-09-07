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

  export default userClass;
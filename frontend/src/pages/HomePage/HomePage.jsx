import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost"
import ContactList from "../../components/ContactList/ContactList";
import axios from "axios";
// import 'reactjs-popup/dist/index.css';


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [userContacts, setUserContacts] = useState([]);
  const [userDates, setUserDates]=useState([])
  const [viewingContact, setViewingContact] = useState()

  const fetchUserContacts = async () => {
    try {
      let response = await axios.get(`${URL_HOST}/api/contacts/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserContacts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchUserDates = async ()=>{
    try {
      let response = await axios.get(`${URL_HOST}/api/dates/user`, {
        headers: {
          Authorization: "Bearer " + token
        },
      });
      setUserDates(response.data);
    } catch (error){
      console.log(error.response.data);
    }
  }

  
  useEffect(() => {
    fetchUserContacts();
    fetchUserDates()
  }, [token]);


  return (
    <div style={{marginTop:'7em'}} className="return">
      <center><h2>Your Contacts</h2></center>
        <ContactList userContacts={userContacts} getUserContacts={fetchUserContacts} />
    </div>
  );
};

export default HomePage;

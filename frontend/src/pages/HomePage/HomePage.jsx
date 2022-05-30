import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost"
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [userContacts, setUserContacts] = useState([]);
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
  
  function filterContacts(searchTerm){
    let filteredContacts = userContacts.filter((contact)=>{
      if (contact.tag === searchTerm){
        return true;
      }
      else{
        return false;
      }})
      setUserContacts(filteredContacts)
  }
  
  useEffect(() => {
    fetchUserContacts();
  }, [token]);
  return (
    <div className="return">
      <div className="contact-list">
        <ContactList userContacts={userContacts} />
      </div>
      <div className="add-contact">
        <ContactForm getUserContacts={fetchUserContacts} />
      </div>
    </div>
  );
};

export default HomePage;

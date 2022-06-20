import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(()=>{
    alert('User: Demo \nPass: Password1@ \nOr Register a new account')
  },[])
  
  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div style={{marginTop:'10em'}}className="container">
      <form className="form" onSubmit={handleSubmit} style={{borderStyle:'outset', padding:'3em', borderRadius:'2em'}}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link style={{textDecoration:'none'}} to="/register"><Button>Register</Button></Link>
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;

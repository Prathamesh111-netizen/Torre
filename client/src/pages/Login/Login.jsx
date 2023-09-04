// Signup.js
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import "./Signup.scss"; // Import the SCSS file
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignup = () => {
    // Make your API call here to store user information
    // Example using fetch:
    console.log("link", `${import.meta.env.VITE_BACKEND_SERVER}/api/users`);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/users`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        window.close();
        window.open("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-root">
      <div className="signup-container">
        <Container>
          <Paper className="signup-form">
            <Typography variant="h5">Login</Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup-input"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
            />
            <Button
              variant="contained"
              color="primary"
              className="signup-button"
              onClick={handleSignup}
            >
              Login into Account
            </Button>
          </Paper>
          <Typography variant="body1">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Signup
            </a>
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default Signup;

// Signup.js

import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import "./Signup.scss"; // Import the SCSS file

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Make your API call here to store user information
    // Example using fetch:
    fetch("YOUR_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from your API
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="signup-root">
      <div className="signup-container">
        <Container>
          <Paper className="signup-form">
            <Typography variant="h5">Signup</Typography>
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
              onClick={handleSignup}
              className="signup-button"
            >
              Signup
            </Button>

            <Typography variant="body1">
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Signup;

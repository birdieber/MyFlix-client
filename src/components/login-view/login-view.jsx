import React from "react";
import { useState } from "react";
import {Button, Form} from "react-bootstrap"


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   // validation of user login
  const handleSubmit = (event) => {
    // prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    //link needs to be changed or endpoint to be added
    fetch("https://shrouded-ocean-05047.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);  
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });

  };

  // submit form login
  return (
  <Form onSubmit={handleSubmit} className="p-5 bg-light rounded">
      <h1>Log in:</h1>
    <Form.Group controlId = "formUsername">
      <Form.Label>
        Username:
        <Form.Control
          type="text"
          value={username}
          minLength="3"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Label>
    </Form.Group>
    <Form.Group controlId="formPassword">
      <Form.Label>
        Password:
          <Form.Control
          type="password"
          value={password}
          minLength="5"
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </Form.Label>
    </Form.Group>
      <Button variant="primary"type="submit" className="mt-3">Submit</Button>
    </Form>
  );
};
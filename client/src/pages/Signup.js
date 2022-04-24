import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  /* Initial state is blank, and it can also be updated upon submission
  to clear the form data */
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Closure that creates and prepares a JS function around the mutation code, then returns it
  // Gives the ability to check for errors as well
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (async)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try/catch instead of promises
    try {
      // execute addUser mutation and pass in variable data from the form
      const { data } = await addUser({
        // ... allows for any number of variables to be passed in and destructured
        variables: { ...formState },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;

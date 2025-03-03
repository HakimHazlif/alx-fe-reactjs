import { useState } from "react";

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

function RegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const { username, email, password } = formData;

  function handleChange(e, label) {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!username)
      setFormDataErrors((prevErrors) => ({
        ...prevErrors,
        username: "This field is requered",
      }));
    if (!email)
      setFormDataErrors((prevErrors) => ({
        ...prevErrors,
        email: "This field is requered",
      }));
    if (!password)
      setFormDataErrors((prevErrors) => ({
        ...prevErrors,
        password: "This field is requered",
      }));

    console.log(formData);
    setFormData(initialFormData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => handleChange(e, "username")}
          // required
        />
        {formDataErrors.username && <p>This field is requered</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => handleChange(e, "email")}
          // required
        />
        {formDataErrors.email && <p>This field is requered</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => handleChange(e, "password")}
          // required
        />
        {formDataErrors.password && <p>This field is requered</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;

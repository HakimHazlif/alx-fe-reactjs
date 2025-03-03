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

  function handleChange(e, label) {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password)
      setFormDataErrors({
        username: !!username,
        email: !!email,
        password: !!password,
      });

    console.log(formData);
    setFormData(initialFormData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={formData.username}
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
          value={formData.email}
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
          value={formData.password}
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

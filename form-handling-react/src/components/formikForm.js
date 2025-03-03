import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("This Field is required"),
  email: Yup.string().email("Invalid email").required("This Field is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("This Field is required"),
});

function FormikForm() {
  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Form Data:", values);
        resetForm();
      }}
    >
      {({ isValid, dirty }) => (
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
            />
            <ErrorMessage name="username" component="p" className="error" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
              required
            />
            <ErrorMessage name="email" component="p" className="error" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <ErrorMessage name="password" component="p" className="error" />
          </div>
          <button type="submit" disabled={!(isValid && dirty)}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default FormikForm;

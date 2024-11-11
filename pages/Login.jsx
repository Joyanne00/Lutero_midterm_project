import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#F7DCB9',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#914F1E',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#28A745',
    borderColor: '#28A745',
    marginRight: '10px',
  },
};

function Login() {
  const [message, setMessage] = useState('');

  // Validation schema for login form
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  // Handle login
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data.user) {
        // Store user info and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        setMessage(`Welcome ${response.data.user.name}`);
        window.location.reload(); // Refresh the page to update navigation
      } else {
        setMessage("Error logging in: Invalid response from server.");
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setMessage(`Error logging in: ${errorMessage}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      {message && <p>{message}</p>}
      <Formik
        validationSchema={schema}
        onSubmit={handleLogin}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" style={styles.button}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;

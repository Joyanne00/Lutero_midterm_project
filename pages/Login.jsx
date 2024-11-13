import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom'; // Import Link for navigation

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
  registerLink: {
    marginTop: '10px',
    display: 'block',
    textAlign: 'center',
    color: '#007BFF',
    textDecoration: 'none',
  }
};

function Login({ onLogin }) {  // Accept onLogin as a prop
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

        // Update user state in App component and redirect
        onLogin(response.data.user);
        navigate('/dashboard');  // Redirect to dashboard after successful login
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
      
      {/* Register link */}
      <Link to="/signup" style={styles.registerLink}>
        If you dont have an account yet, register here
      </Link>
    </div>
  );
}

// Define prop types
Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // onLogin is a required function
};

export default Login;

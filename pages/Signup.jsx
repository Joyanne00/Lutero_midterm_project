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
  clearButton: {
    backgroundColor: '#7f8991',
    borderColor: '#6C757D',
  },
};

function Signup() {
  const [message, setMessage] = useState('');

  // Validation schema for signup form
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  // Handle signup
  const handleSignup = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setMessage(`Account created successfully: ${response.data.user.name}`);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setMessage(`Error signing up: ${errorMessage}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sign Up</h1>
      {message && <p>{message}</p>}
      <Formik
        validationSchema={schema}
        onSubmit={handleSignup}
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

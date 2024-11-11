import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap

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
    width: '100%',
    borderRadius: '20px',
    marginTop: '10px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
  },
  link: {
    color: '#914F1E',
    textDecoration: 'none',
  },
  message: {
    color: '#f8d7da',
    fontSize: '14px',
  },
};

function Signup() {
  const [message, setMessage] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Validation schema for signup form
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  // Handle signup
  const handleSignup = async (values) => {
    if (!isTermsAccepted) {
      setMessage('Please accept the Terms of Use & Privacy Policy');
      return;
    }

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

  // Close modal function
  const handleCloseModal = () => setShowModal(false);

  // Open modal function
  const handleShowModal = () => setShowModal(true);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sign Up</h1>
      {message && <p style={styles.message}>{message}</p>}
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

            <div style={styles.checkbox}>
              <Form.Check
                type="checkbox"
                label="I accept the Terms of Use & Privacy Policy"
                onChange={() => setIsTermsAccepted(!isTermsAccepted)}
              />
              <Button variant="link" onClick={handleShowModal} style={{ color: '#914F1E' }}>
                Read Terms and Privacy Policy
              </Button>
            </div>

            <Button type="submit" style={styles.button} disabled={!isTermsAccepted}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>

      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login" style={styles.link}>Login here</a>
      </p>

      {/* Modal for Terms of Use & Privacy Policy */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Terms of Use & Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Terms of Use</h5>
          <p>By using this application, you agree to the following terms and conditions:</p>
          <ul>
            <li>Acceptance of Terms: By accessing or using this application, you agree to comply with these terms. If you do not agree with any of the terms, please do not use the application.</li>
            <li>User Responsibilities: You are responsible for maintaining the confidentiality of your account details and for all activities that occur under your account.</li>
            <li>Prohibited Activities: You agree not to engage in any activities that may violate any applicable law or regulation, harm individuals, or interfere with the applications normal operation.</li>
            <li>Intellectual Property: All content available on this application is owned by or licensed to the application owner and is protected by copyright laws.</li>
            <li>Termination of Access: We reserve the right to suspend or terminate your access to the application if you violate these terms.</li>
          </ul>
          
          <h5>Privacy Policy</h5>
          <p>Your privacy is important to us. We collect and use your personal data as described in our Privacy Policy:</p>
          <ul>
            <li>Data Collection: We collect personal information such as name, email, and password for the purpose of providing services.</li>
            <li>Data Security: We implement reasonable security measures to protect your personal data.</li>
            <li>Data Sharing: We do not share your personal data with third parties except when necessary for service providers or legal obligations.</li>
            <li>Cookies and Tracking: We use cookies to improve your experience on the application.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signup;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const profileStyles = {
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

function Profile() {
  // State for managing form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submission
    setMessage('Profile updated successfully!'); // Success message after form submit
  };

  // Handle form reset (clear input fields)
  const handleCancel = () => {
    setUsername('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={profileStyles.container}>
      <h1 style={profileStyles.header}>Profile Page</h1>
      {message && <p>{message}</p>} {/* Show success message */}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Handle username input change
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
          />
        </Form.Group>

        <Button type="submit" style={profileStyles.button}>Update Profile</Button>
        <Button type="button" style={profileStyles.clearButton} onClick={handleCancel}>Cancel</Button>
      </Form>
    </div>
  );
}

export default Profile;

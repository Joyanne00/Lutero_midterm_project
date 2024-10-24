import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useState } from 'react';

// Styles for the component
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

function AddProduct() {
  const [message, setMessage] = useState(''); // State for feedback message

  // Validation schema for the form
  const schema = yup.object().shape({
    productCode: yup.string().required('Product code is required'),
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').positive().typeError('Price must be a positive number'),
    quantity: yup.number().required('Quantity is required').integer().typeError('Quantity must be an integer'),
    dateAdded: yup.date().required('Date added is required').typeError('Date must be valid'),
  });

  // Handle form submission
  const handleSave = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        product_code: values.productCode,
        name: values.name,
        description: values.description,
        price: values.price,
        qty: values.quantity,
        date_added: values.dateAdded,
      }); // Adjusted payload structure
      setMessage(`Product saved successfully: ${response.data.name}`); // Success message
      console.log('Product data:', values); // For debugging
    } catch (error) {
      setMessage('Error saving product. Please try again.'); // Error message
      console.error(error);
    }
  };

  // Clear form and reset feedback message
  const handleClear = (resetForm) => {
    resetForm();
    setMessage(''); // Clear message when clearing form
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add Product</h1>
      {message && <p>{message}</p>} {/* Display feedback message */}
      <Formik
        validationSchema={schema}
        onSubmit={handleSave}
        initialValues={{
          productCode: '',
          name: '',
          description: '',
          price: '',
          quantity: '',
          dateAdded: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="productCode">
                <Form.Label>Product Code</Form.Label>
                <Form.Control
                  type="text"
                  name="productCode"
                  value={values.productCode}
                  onChange={handleChange}
                  isInvalid={touched.productCode && !!errors.productCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  step="0.01"
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  isInvalid={touched.quantity && !!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="dateAdded">
                <Form.Label>Date Added</Form.Label>
                <Form.Control
                  type="date"
                  name="dateAdded"
                  value={values.dateAdded}
                  onChange={handleChange}
                  isInvalid={touched.dateAdded && !!errors.dateAdded}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateAdded}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" style={styles.button}>Save Product</Button>
            <Button type="button" style={styles.clearButton} onClick={() => handleClear(resetForm)}>Clear</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProduct;

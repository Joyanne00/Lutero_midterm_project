import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // To navigate after editing
  const [product, setProduct] = useState({
    product_code: '',
    name: '',
    price: '',
    qty: '',
    date_added: new Date(),
  });

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      alert('Product updated successfully!');
      navigate('/'); // Redirect to the product list after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#F7DCB9', borderRadius: '10px' }}>
      <h2 style={{ color: '#914F1E' }}>Edit Product</h2>

      <Form.Group className="mb-3">
        <Form.Label>Product Code</Form.Label>
        <Form.Control
          type="text"
          name="product_code"
          value={product.product_code}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="qty"
          value={product.qty}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date Added</Form.Label>
        <Form.Control
          type="date"
          name="date_added"
          value={new Date(product.date_added).toISOString().split('T')[0]} // Format date
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary">Update Product</Button>
    </Form>
  );
};

export default EditProduct;

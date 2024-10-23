import { useState } from 'react';

const AddProduct = () => {
  const [form, setForm] = useState({
    product_code: '',
    name: '',
    description: '',
    price: 0,
    qty: 0,
    date_added: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
      product_code: '',
      name: '',
      description: '',
      price: 0,
      qty: 0,
      date_added: ''
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable form during submission
    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          });

      if (response.ok) {
        alert("Product successfully saved!");
        handleClear();  // Clear form after saving
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false); // Re-enable form after submission
    }
  };

  return (
    <form onSubmit={handleSave}>
      <label>Product Code</label>
      <input 
        type="text" 
        name="product_code" 
        value={form.product_code} 
        onChange={handleChange} 
        required 
        disabled={isSubmitting} // Disable input during submission
      />

      <label>Name</label>
      <input 
        type="text" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        required 
        disabled={isSubmitting} 
      />

      <label>Description</label>
      <input 
        type="text" 
        name="description" 
        value={form.description} 
        onChange={handleChange} 
        required 
        disabled={isSubmitting} 
      />

      <label>Price</label>
      <input 
        type="number" 
        name="price" 
        value={form.price} 
        onChange={handleChange} 
        required 
        step="0.01" 
        disabled={isSubmitting} 
      />

      <label>Quantity</label>
      <input 
        type="number" 
        name="qty" 
        value={form.qty} 
        onChange={handleChange} 
        required 
        disabled={isSubmitting} 
      />

      <label>Date Added</label>
      <input 
        type="date" 
        name="date_added" 
        value={form.date_added} 
        onChange={handleChange} 
        required 
        disabled={isSubmitting} 
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
      <button type="button" onClick={handleClear} disabled={isSubmitting}>
        Clear
      </button>
    </form>
  );
};

export default AddProduct;

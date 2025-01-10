import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
         // get the token 
         let token =   JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`http://localhost:8080/api/product/${id}`, {
              headers :{
                "Authorization": "Bearer " + token
              }
        }); // Replace with your actual API endpoint
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission to save edited product data
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
         // get the token 
         let token =   JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: 'POST', // Use PUT or PATCH depending on your backend setup
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessage('Product data updated successfully!');
        setTimeout(() => {
          navigate('/'); // Redirect to ProductList after successful update
        }, 2000);
      } else {
        throw new Error('Failed to update product data');
      }
    } catch (error) {
      setMessage('Error updating product data');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!product) return <p>Loading product data...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Product</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={product.pname}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="text"
            name="department"
            value={product.price}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: '50%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  saveButton: {
    padding: '10px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default UpdateProduct;

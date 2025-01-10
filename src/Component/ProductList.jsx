import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name'); // default filter type
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // get the token 
         let token =   JSON.parse(localStorage.getItem("token"));
        const response = await fetch('http://localhost:8080/api/product/products', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        }); // Replace with actual API endpoint
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filter type and search query
  useEffect(() => {
    const filterData = () => {
      const filtered = products.filter(product => {
        if (filterType === 'name') {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filterType === 'price') {
          return product.price.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      });
      setFilteredProducts(filtered);
    };

    filterData();
  }, [searchQuery, filterType, products]);

  // redirect to product component
   const handleEdit = (product) => {
    navigate(`/product/${product.id}`);
   };  

   const handleDelete = async (product) => {
    try {
       // get the token 
       let token =   JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`http://localhost:8080/api/product/${product.id}`, {
          method: 'DELETE', // Use PUT or PATCH depending on your backend setup
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });
  
        if (response.ok) {
           alert('product removed');
          setTimeout(() => {
            navigate('/ProdcutList'); // Redirect to productList after successful update
          }, 1000);
        } else {
          throw new Error('Failed to Remove product');
        }
      } catch (error) {
        
        console.error(error);
      } 
   }; 
   
   const handleAdd = () =>{
      navigate('/product')
   }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Product List</h2>

      {/* Filter Section */}
      <div style={styles.filterContainer}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={styles.dropdown}
        >
          <option value="name">Filter by Name</option>
          <option value="price">Filter by Price</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.AddButton} onClick={() => handleAdd()}>Add New Product</button>
      </div>

      {/* product Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Product ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Image</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{product.id}</td>
                <td style={styles.tableCell}>{product.name}</td>
                <td style={styles.tableCell}>{product.price}</td>
                <td style={styles.tableCell}><img
            src={product.url} // Assuming `product.url` contains the image URL
            alt={product.name}
            style={styles.productImage} // Add styling for consistent image display
          />
                </td>
                <td style={styles.tableCell}>
                  <button style={styles.editButton} onClick={() => handleEdit(product)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(product)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noData}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};



// Styles
const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f3f3f3',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton :{
    margin: '5px',
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: 'rgb(255 0 42)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  AddButton: {
    margin : 'auto 10px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noData: {
    textAlign: 'center',
    padding: '10px',
    color: '#888',
  },
  productImage: {
  width: '50px', // Adjust the width as per your preference
  height: '50px', // Adjust the height as per your preference
  objectFit: 'cover', // Ensures the image fits nicely within the dimensions
  borderRadius: '4px', // Optional: adds rounded corners
},
};

export default ProductList;

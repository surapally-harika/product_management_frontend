import React from "react";

function Navbar() {
  const handleNavigate = () => {
    window.location.href = "/Auth"; // Redirect to the login page
  };

  return (
    <div className="navSection">
      <style>
        {`
          .navSection {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color:gray;
            background-size:100%;
                      }

          .title h2 {
            margin: 0;
            font-size:10px;
          }

          .search input {
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .user, .cart {
            display: flex;
            align-items: center;
          }

          .user button, .cart button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
          }

          .user button:hover, .cart button:hover {
            background-color: #0056b3;
          }

          .user-details {
            margin-right: 10px;
          }
        `}
      </style>
      <div className="title">
        <h2>Product Management</h2>
      </div>
      <div className="search">
        <input type="text" placeholder="Search" />
      </div>
      
      <div className="user">
        <div className="user-details"></div>
        <button onClick={handleNavigate}>
          Login/Register
        </button>
      </div>
      <div className="cart">
        <button>
          Cart
        </button>
      </div>
    </div>
  );
}

export default Navbar;

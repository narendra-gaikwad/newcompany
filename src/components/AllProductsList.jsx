

import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase"; // Import your Firestore configuration

const AllProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // State variable to store product data
  const [filteredProducts, setFilteredProducts] = useState([]); // State variable to store filtered product data

  const navigate = useNavigate();

  // Fetch product data from Firestore when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "productt"));
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        console.log("fetch data", productData);
        setProducts(productData);
        setFilteredProducts(productData); // Initialize filtered products with all products
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    // Filter products based on the search term
    const filteredData = products.filter((item) =>
      item.productData.productName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };
  const NavigateToAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={{
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
        <div className="button-container">
          <Button
            color="primary"
            className="float-right"
            onClick={NavigateToAddProduct}
            style={{
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            Add New Product
          </Button>

          <Button
            color="primary"
            className="float-right"
            style={{
              marginRight: "30px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            All Products
          </Button>
        </div>

        <caption>Products</caption>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Current Price</th>
              <th>Product Details</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.productData.productName}</td>
                <td>{item.productData.currentPrice}</td>
                <td>{item.productData.productDetails}</td>
                <td>
                  <img
                    src={item.productData.imageUrl}
                    alt="Product"
                    width="50"
                    height="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AllProductsList;

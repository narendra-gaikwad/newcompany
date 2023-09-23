import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore, storage } from "../firebase";
import "../components/allproductlist.css";

const AllProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

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
        setFilteredProducts(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    const filteredData = products.filter(
      (item) =>
        item.productData.productName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.productData.currentPrice
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };
  const NavigateToAddProduct = () => {
    navigate("/add-product");
  };
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(firestore, "productt", productId));
      window.alert("Data is Deleted Successfully...");
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
            // className="float-right"
            onClick={NavigateToAddProduct}
            style={{
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            Add New Product
          </Button>

          <Button
            // color="primary"
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
              <th>Delete</th>
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
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDeleteProduct(item.id)}
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

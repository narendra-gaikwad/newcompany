import React, { useState } from "react";
import { Table, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const AllProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = [
    {
      id: 1,
      name: "Notebook",
      place: "Pune",
      age: 19,
      email: "Booked",
      paid: "Packed",
      items: "19",
      total: "19",
      statusImage: "",
    },
    {
      id: 2,
      name: "Book",
      place: "Sangli",
      age: 15,
      email: "Unbooked",
      paid: "Unpaid",
      items: "15",
      total: "15",
    },
    {
      id: 3,
      name: "Eraser",
      place: "Tasgaon",
      age: 7,
      email: "Booked",
      paid: "Paid",
      items: "7",
      total: "7",
    },
    {
      id: 4,
      name: "Pen",
      place: "Satara",
      age: 45,
      email: "Unbooked",
      paid: "Unpaid",
      items: "45",
      total: "45",
    },
    {
      id: 5,
      name: "Pencil",
      place: "Pune",
      age: 9,
      email: "Booked",
      paid: "Paid",
      items: "9",
      total: "9",
    },
    {
      id: 6,
      name: "Bag",
      place: "Pune",
      age: 27,
      email: "Unbooked",
      paid: "Unpaid",
      items: "27",
      total: "27",
    },
    {
      id: 7,
      name: "Colour Pen",
      place: "Pune",
      age: 24,
      email: "Booked",
      paid: "Paid",
      items: "24",
      total: "24",
    },
    {
      id: 8,
      name: "Drawing Book",
      place: "Pune",
      age: 14,
      email: "Unbooked",
      paid: "Unpaid",
      items: "14",
      total: "14",
    },
    {
      id: 9,
      name: "Story Book",
      place: "Pune",
      age: 49,
      email: "Booked",
      paid: "Paid",
      items: "49",
      total: "49",
    },
  ];
  const navigate = useNavigate();

  const NavigateToAddProduct = () => {
    navigate("/add-product");
  };
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* <div className="button-container" style={{ marginRight: "10px" }}></div> */}
        <caption>Orders</caption>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order No & Name</th>
              <th>Order Place</th>
              <th>Order Status</th>
              <th>Paid</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.place}</td>
                <td>{item.email}</td>
                <td>{item.paid}</td>
                <td>{item.items}</td>
                <td>{item.total}</td>
                <td>
                  <img
                    src={item.statusImage} // Use the statusImage property
                    alt="Status" // Provide an alt text for accessibility
                    width="50" // Adjust the width as needed
                    height="50" // Adjust the height as needed
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <Button
                  color="primary"
                  type="button"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Submit
                </Button> */}
    </>
  );
};

export default AllProductsList;

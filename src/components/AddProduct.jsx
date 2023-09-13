import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";

const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const handleFormSubmit = async () => {
    if (productName && currentPrice && productDetails && selectedImage) {
      try {
        const imageRef = ref(storage, `images/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);

        const imageURL = await getDownloadURL(imageRef);

        const productData = {
          productName: productName,
          currentPrice: currentPrice,
          productDetails: productDetails,
          imageUrl: imageURL,
        };

        const docRef = await addDoc(collection(firestore, "productt"), {
          productData,
        });

        alert(`Product data saved with ID: ${docRef.id}`);

        setProductName("");
        setCurrentPrice("");
        setProductDetails("");
        setSelectedImage(null);
      } catch (error) {
        console.error("Error saving product data:", error);
      }
    } else {
      alert("Please fill in all fields and select an image before submitting.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          className="mt--7"
          fluid
          style={{
            marginTop: "70px",
            marginLeft: "300px",
          }}
        >
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Product</h3>
                    </Col>
                    <Col className="text-right" xs="4"></Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-product-name"
                            >
                              Product Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              id="input-product-name"
                              placeholder="Product Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-current-price"
                            >
                              Current Price
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={currentPrice}
                              onChange={(e) => setCurrentPrice(e.target.value)}
                              id="input-current-price"
                              placeholder="Current Price"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label className="form-control-label">
                              Upload Image
                            </label>
                            <div className="d-flex align-items-center">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                // style={{
                                //   width: "400px",
                                // }}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label className="form-control-label">
                          Product Details
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={productDetails}
                          onChange={(e) => setProductDetails(e.target.value)}
                          rows="4"
                          defaultValue=""
                          type="textarea"
                        />
                      </FormGroup>
                    </div>

                    <Button
                      color="primary"
                      type="button"
                      onClick={handleFormSubmit}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddProduct;

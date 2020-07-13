import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    Axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert("Failed to import the products.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    console.log("product", product);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${product.images[0]}`}
            />
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h3>
          Let's Playing Game <Icon type="rocket" />
        </h3>
      </div>

      {/* Filter */}

      {/* Search */}

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>More</button>
      </div>
    </div>
  );
}

export default LandingPage;

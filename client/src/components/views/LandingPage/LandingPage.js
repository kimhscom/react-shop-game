import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import { category, price } from "./Sections/Datas";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    Axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to import the products.");
      }
    });
  };

  const loadMorehandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    console.log("product", product);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilterResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, type) => {
    const newFilters = { ...Filters };

    newFilters[type] = filters;

    console.log("filters", filters);

    if (type === "price") {
      let priceValues = handlePrice(filters);
      newFilters[type] = priceValues;
    }

    showFilterResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h3>
          Let's Playing Game <Icon type="rocket" />
        </h3>
      </div>

      {/* Filter */}
      <Row gutter={(16, 16)}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <Checkbox
            list={category}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <Radiobox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* Search */}

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMorehandler}>More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

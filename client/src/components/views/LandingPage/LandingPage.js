import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";

function LandingPage() {
  useEffect(() => {
    Axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("Failed to import the products.");
      }
    });
  }, []);

  return <div>Landing Page</div>;
}

export default LandingPage;

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

const Categories = [
  { key: 1, value: "PlayStation4" },
  { key: 2, value: "XBOX One" },
  { key: 3, value: "Nintendo Switch" },
  { key: 4, value: "PC Game" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Category, setCategory] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Title || !Description || !Price || !Category || !Images) {
      return alert("You must have to put in all the values.");
    }

    // Send the filled values to the server as a request.

    const body = {
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      category: Category,
      images: Images,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("Succeeded to upload product.");
        props.history.push("/");
      } else {
        alert("Failed to upload product.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Game Product Upload</h2>
      </div>
      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={categoryChangeHandler} value={Category}>
          {Categories.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;

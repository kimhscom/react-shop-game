import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

function UploadProductPage() {
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

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Game Product Upload</h2>
      </div>
      <Form>
        {/* DropZone */}
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
        <select>
          <option></option>
        </select>
        <br />
        <br />
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;

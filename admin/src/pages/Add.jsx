import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "2rem" }}>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <p className="form-label">Upload Images</p>
          <div className="upload-grid">
            <label htmlFor="image1" className="upload-box">
              {image1 ? <img src={URL.createObjectURL(image1)} alt="" /> : <span>+</span>}
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2" className="upload-box">
              {image2 ? <img src={URL.createObjectURL(image2)} alt="" /> : <span>+</span>}
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3" className="upload-box">
              {image3 ? <img src={URL.createObjectURL(image3)} alt="" /> : <span>+</span>}
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4" className="upload-box">
              {image4 ? <img src={URL.createObjectURL(image4)} alt="" /> : <span>+</span>}
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className="form-group">
          <p className="form-label">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-input"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="form-group">
          <p className="form-label">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-textarea"
            placeholder="Write content here"
            required
            rows="4"
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="form-group" style={{ flex: 1 }}>
            <p className="form-label">Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className="form-select">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <p className="form-label">Sub Category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className="form-select">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <p className="form-label">Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="form-input"
              type="number"
              placeholder="25"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <p className="form-label">Product Sizes</p>
          <div className="sizes-container">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                  )
                }
                className={`size-pill ${sizes.includes(size) ? "active" : ""}`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            style={{ width: "18px", height: "18px" }}
          />
          <label className="form-label" style={{ marginBottom: 0 }} htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;

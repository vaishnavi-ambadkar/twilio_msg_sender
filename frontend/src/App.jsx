
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Importing the stylesheet
axios.defaults.withCredentials=true;

function App() {
  const [formData, setFormData] = useState({
    to: "",
    message: "",
  });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://twilio-msg-sender-back.vercel.app/send-message", formData);
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error sending message");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="title">Send a Message</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label className="label">To (Phone Number)</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="input"
              placeholder="+1234567890"
              required
            />
          </div>
          <div className="input-field">
            <label className="label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea"
              placeholder="Your message here..."
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send</button>
        </form>
        {response && <p className={`response-message ${response === "Error sending message" ? "error" : "success"}`}>{response}</p>}
      </div>
    </div>
  );
}

export default App;

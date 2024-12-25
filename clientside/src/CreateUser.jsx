import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

//The function to Create New Users within the System
function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/createUser", { name, email, age })
            .then(() => {
                navigate("/");
            })
            .catch((err) => console.error(err));
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setAge("");
    };

    // The arrow to go back to the HomePage
    const handleLogoClick = () => {
        navigate("/");
    };
    //The Reason I inteded to have cu was because the CSS would me more undestandable considering CU stands for Create User
    return (
        <div className="cu-container">
            {/* Left Gradient Section */}
            <div className="cu-gradient-section">
                {/* The arrow to go back to the HomePage */}
                <img
                    src="/images/barrow.png"
                    alt="Logo"
                    className="cu-image"
                    onClick={handleLogoClick} 
                    style={{ cursor: "pointer" }}/>
                <div className="cu-gradient-content">
                    <p className="cu-small-text">Welcome,</p>
                    <h1 className="cu-large-text">Create <br /> User</h1>
                </div>
            </div>

            {/* Create User Section in ord */}
            <div className="cu-form-section">
                <form onSubmit={Submit} className="cu-form">
                    <h2>Register User</h2>
                    <div className="cu-form-group">
                        <label htmlFor="name" className="cu-label">
                            Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="cu-input"
                            onChange={(e) => setName(e.target.value)}
                            value={name}/>
                    </div>
                    <div className="cu-form-group">
                        <label htmlFor="email" className="cu-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="cu-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                    </div>
                    <div className="cu-form-group">
                        <label htmlFor="age" className="cu-label">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Enter Age"
                            className="cu-input"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}/>
                    </div>
                    <div className="cu-button-container">
                        <button type="submit" className="cu-submit-button">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="cu-clear-button"
                            onClick={clearForm}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;

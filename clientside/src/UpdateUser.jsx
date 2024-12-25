import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

//The function to update the existing User Details 
function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //Feteches the exact data of the selected User
    useEffect(() => {
        axios
            .get(`http://localhost:3001/getUser/${id}`)
            .then((response) => {
                const user = response.data;
                if (user) {
                    setName(user.name || "");
                    setEmail(user.email || "");
                    setAge(user.age ? user.age.toString() : "");
                } else {
                    setError("User not found.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                setError("Error fetching user data.");
                setLoading(false);
            });
    }, [id]);

    //The User should be able to fill all the text fields
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !age) {
            setError("All fields are required.");
            return;
        }

        axios
            .put(`http://localhost:3001/updateUser/${id}`, {
                name: name.trim(),
                email: email.trim(),
                age: parseInt(age, 10),
            })
            .then(() => navigate("/"))
            .catch((err) => {
                console.error("Error updating user:", err);
                setError("Error updating user.");
            });
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setAge("");
    };

    const handleLogoClick = () => {
        navigate("/"); // Function of the back icon to revert back to the Home Page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cu-container">
            {/* Gradient is no longer used within the project instead it's one single color */}
            <div className="cu-gradient-section">
                {/* The Back Arrow Function is defined here*/}
                <img
                    src="/images/barrow.png"
                    alt="Logo"
                    className="cu-image"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}/>
                <div className="cu-gradient-content">
                    <p className="cu-small-text">Welcome,</p>
                    <h1 className="cu-large-text">Update <br /> User</h1>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="cu-form-section">
                <form onSubmit={handleSubmit} className="cu-form">
                    <h2>Update User</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="cu-form-group">
                        <label htmlFor="name" className="cu-label">
                            Name
                        </label>
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
                            Update
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

export default UpdateUser;

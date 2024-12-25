import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get("http://localhost:3001")
            .then((result) => setUsers(result.data))
            .catch((err) => console.log("Error fetching users:", err));
    };

    const handleDelete = (id) => {
        toast.info(
            <>
                <div>
                    Are you sure you want to delete this user?
                    <div className="mt-2">
                        <button
                            onClick={() => confirmDelete(id)}
                            className="btn btn-danger btn-sm me-2">
                            Confirm
                        </button>
                        <button
                            onClick={() => toast.dismiss()}
                            className="btn btn-secondary btn-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </>,
            {
                autoClose: false,
                closeOnClick: false,
            }
        );
    };

    const confirmDelete = (id) => {
        axios
            .delete(`http://localhost:3001/deleteUser/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user._id !== id));
                toast.success("User deleted successfully!");
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
                toast.error("Failed to delete the user.");
            });
    };

    return (
        <div>
            <ToastContainer />
            <header className="navbar">
                <h1 className="navbar-logo">Gear Up</h1>
                <nav>
                    <ul className="navbar-menu">
                        <li className="dropdown">
                            <span>Products</span>
                            <ul className="dropdown-menu">
                                <li><a href="#">E-commerce Solutions</a></li>
                                <li><a href="#">Online Storefronts</a></li>
                                <li><a href="#">Payment Gateways</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </nav>
            </header>

            <div className="info-section">
                <img src="/images/workpic.jpg" alt="Work" className="info-image" />
                <div className="info-content">
                    <h2 className="info-heading">We are the best at what we do</h2>
                    <p className="info-description">At Gear Up, led by Ahaz Fernando, we provide top-notch e-commerce solutions designed to empower businesses to thrive in the digital marketplace. Our commitment to innovation and excellence sets us apart in delivering impactful results.</p>
                    <a href="https://www.youtube.com/@ahazfernando542" target="_blank" rel="noopener noreferrer" className="info-button">
                        Discover More
                    </a>
                </div>
            </div>
            <div className="user-container">
                <div className="user-gradient-section">
                    <div className="user-gradient-content">
                        <p className="user-small-text">Welcome,</p>
                        <h1 className="user-large-text">Customer <br /> Database</h1>
                    </div>
                </div>
                <div className="user-table-section">
                    <div className="w-100 bg-white rounded p-3">
                        <div className="d-flex justify-content-between mb-3">
                            <h3>User List</h3>
                            <Link to="/create" className="btn btn-success">
                                Create User
                            </Link>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link
                                                to={`/update/${user._id}`}
                                                className="btn btn-success btn-sm me-2">
                                                Update Details
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="services-section">
                <h2 className="services-heading">Our Services</h2>
                <p className="services-description">
                    Gear Up specializes in providing a comprehensive range of e-commerce solutions, including custom-built storefronts, integration with secure payment gateways, seamless logistics management, and data-driven marketing strategies.
                </p>
                <div className="services-container">
                    <div className="service-card">
                        <h3 className="service-title">E-commerce Solutions</h3>
                        <p className="service-description">Empower your online business with tailored e-commerce platforms and tools.</p>
                        <button className="service-button">Learn More</button>
                    </div>
                    <div className="service-card">
                        <h3 className="service-title">Online Storefronts</h3>
                        <p className="service-description">Build attractive and user-friendly online stores to showcase your products effectively.</p>
                        <button className="service-button">Learn More</button>
                    </div>
                    <div className="service-card">
                        <h3 className="service-title">Payment Gateways</h3>
                        <p className="service-description">Integrate secure and reliable payment options for a smooth customer experience.</p>
                        <button className="service-button">Learn More</button>
                    </div>
                    <div className="service-card">
                        <h3 className="service-title">Logistics Management</h3>
                        <p className="service-description">Optimize your delivery process with our advanced logistics solutions.</p>
                        <button className="service-button">Learn More</button>
                    </div>
                    <div className="service-card">
                        <h3 className="service-title">Digital Marketing</h3>
                        <p className="service-description">Boost your online presence with targeted marketing campaigns that drive results.</p>
                        <button className="service-button">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;

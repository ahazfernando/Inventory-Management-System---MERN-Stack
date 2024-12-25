import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./User";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/update/:id" element={<UpdateUser />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

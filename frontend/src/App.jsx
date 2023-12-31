import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Createbook from './components/CreateBook';
import Deletebook from './components/DeleteBook';
import Updatebook from './components/UpdateBook';
import Showbook from './components/ShowBook';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/updatebook/:id" element={<Updatebook />}/>
        <Route exact path="/showbook/:id" element={<Showbook/>}/>
        <Route exact path="/deletebook/:id" element={<Deletebook/>}/>
        <Route exact path="/createbook" element={<Createbook/>}/>
      </Routes>
    </div>
  );
};

export default App;

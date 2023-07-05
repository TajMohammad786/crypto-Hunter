import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import React from "react";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import CryptoContext from "./CryptoContext";


function App() {
  return (
    <BrowserRouter>

      <CryptoContext>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </CryptoContext>


    </BrowserRouter>
  );
}

export default App;

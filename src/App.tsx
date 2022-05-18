import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import NotFound from "./pages/not-found/NotFound";
import NavigationMain from "./components/navigation/NavigationMain";
import HomePage from "./pages/home/home-page/HomePage";

function App() {
  return (
    <div className="App">
      <NavigationMain />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<HomePage />}>
          <Route path=":lng" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

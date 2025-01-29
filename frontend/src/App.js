import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/pages/Menu";
import Lobby from "./components/pages/Lobby";
import Game from "./components/pages/Game";
import Shop from "./components/pages/Shop";
import Settings from "./components/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/play' element={<Game />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/profile' element={<Settings tab="profile" />} />
        <Route path="/stats" element={<Settings tab="stats" />} />
        <Route path='/settings' element={<Settings tab="settings" />} />
      </Routes>
    </BrowserRouter>
  );
};
import React from 'react';
import App from './App';
import { Routes, Route } from 'react-router-dom';
import Halamansoal from './Halamansoal';

const navigasi = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ujian" element={<Halamansoal />} />
    </Routes>
  );
};

export default navigasi;

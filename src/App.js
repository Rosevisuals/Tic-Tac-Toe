import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tictac from './component/Tictac';

const App = () => {
  return (
    <Router>
      <Routes>
        
      <Route path="/" element={<Tictac />} />
      </Routes>
    </Router>
  )
}

export default App

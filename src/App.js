import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import RandomResult from './pages/RandomResult';
import Question from './pages/Question';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/random-result' element={<RandomResult />} />
        <Route path='/question' element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

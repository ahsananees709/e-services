import React from 'react';
import AppRoutes from './components/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
        <AppRoutes />
    </div>
  );
}

export default App;

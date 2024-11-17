import logo from './logo.svg';
import './App.css';
import {routerAdapter, setRole} from "./utils/AppController";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";

function App() {
  
  let MainRouter = routerAdapter();
  return (

      MainRouter
  );
}

export default App;

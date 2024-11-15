import logo from './logo.svg';
import './App.css';
import {routerAdapter, setRole} from "./utils/AppController";

function App() {

  let MainRouter = routerAdapter();
  return (
    MainRouter
  );
}

export default App;

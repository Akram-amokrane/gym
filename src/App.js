import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WindowBar from "./components/WindowBar";
import Dashboard from "./components/pages/Dashboard";
import Subscribers from "./components/pages/Subscribers";
import Settings from "./components/pages/Settings";
import Calendar from "./components/pages/Calendar";

function App() {
  return (
    <div className='App'>
      <Router>
        <WindowBar resizable={true} />
        <NavBar />
        <div id='fragment'>
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/users' element={<Subscribers />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

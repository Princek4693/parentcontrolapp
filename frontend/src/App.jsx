import './App.css';
import Login from './component/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentDashBoard from './component/parent/ParentDashBoard';
import ChildDashBoard from './component/child/ChildDashBoard';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ParentDashBoard />} />
        <Route path="/childdashboard" element={<ChildDashBoard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

import './App.css';
import Login from './component/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentDashBoard from './component/parent/ParentDashBoard';
import ChildDashBoard from './component/child/ChildDashBoard';
import ForgotPasswordPage from './component/login/ForgotPassword';
import ResetLinkPage from './component/login/ResetLinkPage';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ParentDashBoard />} />
        <Route path="/childdashboard" element={<ChildDashBoard />} />
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-link" element={<ResetLinkPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

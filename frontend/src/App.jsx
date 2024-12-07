import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';

// Components
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import IndividualAuth from './pages/IndividualAuth';
import GroupAuth from './pages/GroupAuth';
import CrowdCount from './pages/CrowdCount';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App animated-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/individual-auth" element={<IndividualAuth />} />
            <Route path="/group-auth" element={<GroupAuth />} />
            <Route path="/crowd-count" element={<CrowdCount />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

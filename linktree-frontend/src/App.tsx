import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import CreateUserPage from './CreateUserPage';
import LinktreePage from './LinktreePage';
import ForgetPassword from './ForgetPassword'; // Import ForgetPassword component
import EditLinkPage from "./EditLinkPage";
import ResetPasswordScreen from "./ResetPasswordScreen";
import BiographyPage from "./Biography";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} /> {/* Default route */}
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/linktree" element={<LinktreePage />} />
        <Route path="/forget-password" element={<ForgetPassword />} /> {/* Forgot Password route */}
        <Route path="/edit-link/:id" element={<EditLinkPage />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/biography" element={<BiographyPage />} />
      </Routes>
    </Router>
  );
};

export default App;

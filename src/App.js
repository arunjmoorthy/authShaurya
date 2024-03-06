import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Success from './pages/Success';
import NewTeam from './pages/NewTeam';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/success' element={<Success />}/>
        <Route path='/newTeam' element={<NewTeam />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import UserContext from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <UserContext.Provider value={ {username, setUsername, password, setPassword, isLogged, setIsLogged} }>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<ProtectedRoute>{<Home />} </ProtectedRoute>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

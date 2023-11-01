import { Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;

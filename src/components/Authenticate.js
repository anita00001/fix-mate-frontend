import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Authenticate() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url("./images/fix-background.jpg")', backgroundSize: 'cover' }}>
      <div className="bg-black p-4 text-center opacity-75">
        <div className="text-2xl font-bold">Hi, FIX MATE</div>
        <p className="text-white">
          <span className="text-green-500 font-bold">Fix Mate </span>
          is committed to making everyday life more convenient by connecting users with trusted
          service providers. It is a one-stop platform for finding, booking, and  reviewing
          services, all from the comfort of your home. Users can communicate with service
          providers through the app, discussing specific requirements, asking questions,
          and confirming details.
        </p>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          type="button"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

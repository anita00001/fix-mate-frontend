import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Navigation/Sidebar';
import { fetchSpecializations, specialDetails } from '../../redux/Specializations/specialitiesSlice';

export default function Specialize() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const error = useSelector((state) => state.login.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(specialDetails({ name, description }));
    dispatch(fetchSpecializations());
    setName('');
    setDescription('');
  };

  return (
    <>
      <Sidebar />
      <div>
        <div className="flex items-center justify-center h-screen">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded-md">
            <h1 className="font-bold text-gray-500 text-2xl mb-4">Add New Specialization</h1>
            {error && <p className="text-red-700 bg-red-50 p-2 mb-3">Failed to create specialization</p>}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                placeholder="Write name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                placeholder="Write description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-32"
              />
            </div>
            <button type="submit" className="w-full bg-lime-300 text-white hover:bg-lime-500 rounded-md py-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

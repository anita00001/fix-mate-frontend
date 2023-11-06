import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postReservationDetails } from '../../redux/Reservations/sendReservationSlice';

function ReservationFormDetails() {
  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [city, setCity] = useState('');
  const [reserveDate, setReserveDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReservationDetails({
      expert_id: id,
      user_id: jsonObject.id,
      city,
      date: reserveDate,
    }));
    navigate('/reservations');
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-lime-300 transparent text-center">
      <div className="absolute top-0 left-0 m-4">
        <button type="button" onClick={() => navigate(-1)} className="bg-red-500 text-white p-2 font-bold hover:bg-red-800 rounded-lg">
          X
        </button>
      </div>
      <h1 className="text-gray-600 font-bold">{`Hello ${jsonObject.name} you are about to reserve`}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 w-full p-4 rounded-md" style={{ width: 500 }}>
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter city here"
            required
            id="city"
            autoComplete="off"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            id="reserveDate"
            value={reserveDate}
            onChange={(e) => setReserveDate(e.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <button type="submit" className="bg-lime-500 px-4 text-white hover:bg-lime-600 rounded-md py-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationFormDetails;

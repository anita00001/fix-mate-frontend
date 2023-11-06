import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryExpertDetails } from '../../redux/QueryExperts/queryExpertsSlice';
import { postReservationDetails } from '../../redux/Reservations/sendReservationSlice';

function ReservationForm() {
  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expertId, setExpertId] = useState('');
  const [city, setCity] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const { expertData, error, loading } = useSelector((state) => state.queryexperts);
  const { postReservationData, error1, loading1 } = useSelector((state) => state.sendreservation);

  useEffect(() => {
    dispatch(queryExpertDetails());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReservationDetails({
      expert_id: expertId,
      user_id: jsonObject.id,
      city,
      date: reserveDate,
    }));
    setExpertId('');
    setCity('');
    setReserveDate('');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ x: ['-100%', '100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#98bf11',
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-cover" style={{ backgroundImage: 'url("./images/reservation.jpg")' }}>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black p-4 text-center opacity-75">
        <div className="w-full flex">
          <button type="button" onClick={() => navigate(-1)} className="bg-red-500 text-white p-2 font-bold hover:bg-red-800 rounded-lg">
            X
          </button>
        </div>
        {error && <div className="p-2 mb-2 text-sm text-red-800 font-bold rounded-lg bg-red-50">Expert data failed to load</div>}
        {loading && <div className="p-2 mb-2 text-sm text-green-800 font-bold rounded-lg bg-green-50">Expert data is loading ...</div>}
        {error1 && <div className="p-2 mb-2 text-sm text-red-800 font-bold rounded-lg bg-red-50">Reserving and expert failed at this point</div>}
        {loading1 && <div className="p-2 mb-2 text-sm text-green-800 font-bold rounded-lg bg-green-50">loading ...</div>}
        {postReservationData && <div className="p-2 mb-2 text-sm text-green-800 font-bold rounded-lg bg-green-50">You have just reserved an Expert</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded-md">
          <div className="text-2xl text-white font-bold mb-3">Reserve an Expert</div>
          <div>
            <input
              type="text"
              id="user_id"
              disabled
              required
              value={jsonObject.name}
              className="w-full px-3 py-2 border rounded-md bg-lime-200"
            />
          </div>
          <select
            id="expert_id"
            value={expertId}
            required
            onChange={(e) => setExpertId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-lime-200"
          >
            <option value="">Select an Expert</option>
            {expertData && Object.entries(expertData).map(([id, data]) => (
              <option key={id} value={data.id}>
                {`${data.first_name} ${data.last_name}`}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <input
              type="text"
              id="city"
              placeholder="Write your City here"
              autoComplete="off"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-lime-200"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              id="reserveDate"
              placeholder="date"
              required
              value={reserveDate}
              onChange={(e) => setReserveDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-lime-200"
            />
          </div>
          <button type="submit" className="w-full bg-lime-500 text-white hover:bg-lime-600 rounded-md py-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;

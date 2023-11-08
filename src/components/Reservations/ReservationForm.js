import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryExpertDetails } from '../../redux/QueryExperts/queryExpertsSlice';
import { postReservationDetails } from '../../redux/Reservations/sendReservationSlice';
import Sidebar from '../Navigation/Sidebar';

const ReservationForm = () => {
  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expertId, setExpertId] = useState('');
  const [city, setCity] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const { expertData, error, loading } = useSelector((state) => state.queryexperts);
  const { error1, loading1 } = useSelector((state) => state.sendreservation);

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
    navigate('/reservations');
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
    <>
      <Sidebar />
      <div className="h-screen bg-gray-100">
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-200">
          {error && (
            <div className="text-red-500">Expert data failed to load</div>
          )}
          {loading && (
            <div className="text-blue-500">Expert data is loading ...</div>
          )}
          {error1 && (
            <div className="text-red-500">
              Reserving an expert failed at this point
            </div>
          )}
          {loading1 && <div className="text-blue-500">loading ...</div>}
          <motion.form
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50, duration: 2 }}
            onSubmit={handleSubmit}
            className="relative w-full max-w-md rounded bg-white p-8 shadow-md"
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-red-500 p-1 text-white transition duration-200 hover:bg-red-700"
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="mb-4 text-2xl font-bold">Reserve an Expert</div>
            <div className="mb-4">
              <input
                type="text"
                id="user_id"
                disabled
                required
                value={jsonObject.name}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="mb-4">
              <select
                id="expert_id"
                value={expertId}
                required
                onChange={(e) => setExpertId(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select an Expert</option>
                {expertData
                  && Object.entries(expertData).map(([id, data]) => (
                    <option key={id} value={data.id}>
                      {`${data.first_name} ${data.last_name}`}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="city"
                placeholder="Write your City here"
                autoComplete="off"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
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
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded bg-primary p-2 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;

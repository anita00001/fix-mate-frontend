import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { postReservationDetails } from '../../redux/Reservations/sendReservationSlice';
import { fetchExperts } from '../../redux/Experts/expertsSlice';
import Sidebar from '../Navigation/Sidebar';

const ReservationFormDetails = () => {
  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [city, setCity] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const experts = useSelector((state) => state.experts.experts);
  const expRecord = experts.find((expert) => expert.id === Number(id));

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

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
    <>
      <Sidebar />
      <motion.div
        className="flex h-screen items-center justify-center bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Hello,
              {' '}
              <span>{jsonObject.name}</span>
            </h1>
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-red-500 shadow"
            >
              X
            </motion.button>
          </div>
          <div className="mt-4 flex items-center">
            <div className="mr-4">
              <motion.img
                src={expRecord.image_url}
                className="rounded-full"
                alt="expert"
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
              />
            </div>
            <div className="text-center">
              <p>
                You are about to reserve
                {' '}
                <span className="font-semibold text-lime-400">
                  {expRecord.first_name}
                  {' '}
                  {expRecord.last_name}
                </span>
                , an expert in
                {' '}
                <span className="font-semibold text-lime-400">
                  {expRecord.name}
                </span>
                .
              </p>
              <p>
                You can reach out to them at
                {' '}
                <span className="font-semibold text-lime-400">
                  {expRecord.email}
                </span>
                .
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 text-center">
            <input
              type="text"
              id="user"
              disabled
              value={jsonObject.name}
              className="input"
            />
            <input
              type="text"
              id="user"
              disabled
              value={`${expRecord.first_name} ${expRecord.last_name}`}
              className="input"
            />
            <input
              type="text"
              id="user"
              disabled
              value={expRecord.name}
              className="input"
            />
            <input
              type="text"
              placeholder="Enter city here"
              required
              id="city"
              autoComplete="off"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
            />
            <input
              type="date"
              required
              id="reserveDate"
              value={reserveDate}
              onChange={(e) => setReserveDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input"
            />
            <motion.button
              type="submit"
              className="hover-bg-blue-700 mt-4 w-[80%] rounded-full bg-primary px-3 py-2 font-semibold text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ReservationFormDetails;

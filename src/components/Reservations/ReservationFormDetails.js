import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postReservationDetails } from '../../redux/Reservations/sendReservationSlice';
import { fetchExperts } from '../../redux/Experts/expertsSlice';

function ReservationFormDetails() {
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
    <div className="h-screen bg-lime-200">
      <div className="relative h-screen">
        <img src={expRecord.image_url} alt="expert" className="absolute inset-0 block mx-auto my-auto filter opacity-50 grayscale z-10" />
        <div className="block mx-auto h-screen flex flex-col justify-center items-center">
          <div className="absolute top-0 left-0 m-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-red-500 text-white p-2 font-bold hover:bg-red-800 rounded-lg">
              X
            </button>
          </div>
          <div className="bg-white z-20 p-2 flex flex-col justify-center items-center rounded-lg opacity-75">
            <h1 className="text-gray-700 font-normal">
              {'Hello, '}
              <span className="text-green-500 italic font-bold">{jsonObject.name}</span>
              {' you are about to reserve '}
              <span className="text-green-500 italic font-bold">{expRecord.first_name}</span>
              {' '}
              <span className="text-green-500 italic font-bold">{expRecord.last_name}</span>
            </h1>
            <h1 className="text-gray-700 font-normal">
              {'Who is an expert in '}
              <span className="text-green-500 italic font-bold">{expRecord.name}</span>
              {' . You can reach out to him/her on '}
              <span className="text-green-500 italic font-bold">{expRecord.email}</span>
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 w-full p-4 rounded-md z-20" style={{ width: 500 }}>
              <div className="relative z-0 w-full mb-4 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
        </div>
      </div>
    </div>
  );
}

export default ReservationFormDetails;

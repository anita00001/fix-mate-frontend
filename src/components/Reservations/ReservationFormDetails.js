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
        <img
          src={expRecord.image_url}
          alt="expert"
          className="absolute inset-0 z-10 mx-auto my-auto block rounded-lg opacity-50 grayscale filter"
        />
        <div className="mx-auto block flex h-screen flex-col items-center justify-center">
          <div className="absolute left-0 top-0 m-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg bg-red-500 p-2 font-bold text-white hover:bg-red-800"
            >
              X
            </button>
          </div>
          <div className="z-20 flex flex-col items-center justify-center rounded-lg bg-white p-2 opacity-75">
            <h1 className="font-normal text-gray-700">
              {'Hello, '}
              <span className="font-bold italic text-green-500">
                {jsonObject.name}
              </span>
              {' you are about to reserve '}
              <span className="font-bold italic text-green-500">
                {expRecord.first_name}
              </span>
              {' '}
              <span className="font-bold italic text-green-500">
                {expRecord.last_name}
              </span>
            </h1>
            <h1 className="font-normal text-gray-700">
              {'Who is an expert in '}
              <span className="font-bold italic text-green-500">
                {expRecord.name}
              </span>
              {' . You can reach out to him/her on '}
              <span className="font-bold italic text-green-500">
                {expRecord.email}
              </span>
            </h1>
            <form
              onSubmit={handleSubmit}
              className="z-20 grid w-full grid-cols-3 gap-4 rounded-md p-4"
              style={{ width: 500 }}
            >
              <div className="group relative z-0 mb-3 w-full">
                <input
                  type="text"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-0"
                  id="user"
                  disabled
                  value={jsonObject.name}
                />
              </div>
              <div className="group relative z-0 mb-3 w-full">
                <input
                  type="text"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-0"
                  id="user"
                  disabled
                  value={`${expRecord.first_name} ${expRecord.last_name}`}
                />
              </div>
              <div className="group relative z-0 mb-3 w-full">
                <input
                  type="text"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-0"
                  id="user"
                  disabled
                  value={expRecord.name}
                />
              </div>
              <div className="group relative z-0 mb-3 w-full">
                <input
                  type="text"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Enter city here"
                  required
                  id="city"
                  autoComplete="off"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="group relative z-0 mb-3 w-full">
                <input
                  type="date"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-0"
                  required
                  id="reserveDate"
                  value={reserveDate}
                  onChange={(e) => setReserveDate(e.target.value)}
                />
              </div>
              <div className="group relative z-0 mb-4 w-full">
                <button
                  type="submit"
                  className="rounded-md bg-lime-500 px-4 py-2 text-white hover:bg-lime-600"
                >
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

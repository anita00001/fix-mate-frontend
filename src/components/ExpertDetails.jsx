import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExperts } from '../redux/Experts/expertsSlice';
import Sidebar from './Sidebar';

const ExpertDetails = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  const renderStatus = (expert) => {
    if (expert.status) {
      return <p style={{ color: 'green' }}>Active</p>;
    }
    return <p style={{ color: 'red' }}>Inactive</p>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="m-4 max-w-md rounded-lg bg-white p-4 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-blue-600">
              {expert.first_name}
              {' '}
              {expert.last_name}
            </h2>
            <p className="text-gray-600">{expert.email}</p>
            <p className="text-gray-600">{expert.address}</p>
            <p className="text-gray-600">
              Experience:
              {' '}
              {expert.experience}
              {' '}
              years
            </p>
            {renderStatus(expert)}
            <p className="font-semibold text-green-600">
              Fee: $
              {expert.fee}
            </p>
            <p className="text-gray-600">{expert.name}</p>
            <p className="text-gray-600">{expert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertDetails;

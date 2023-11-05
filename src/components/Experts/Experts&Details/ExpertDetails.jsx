import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchExperts } from '../../../redux/Experts/expertsSlice';
import Sidebar from '../../Navigation/Sidebar';

const ExpertDetails = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);
  const { id } = useParams();
  const expertId = Number(id);
  const expert = experts.find((expert) => expert.id === expertId);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(fetchExperts()).then(() => setLoading(false));
  }, [dispatch]);

  const renderStatus = (expert) => {
    if (expert.status) {
      return <p style={{ color: 'green' }}>Active</p>;
    }
    return <p style={{ color: 'red' }}>Inactive</p>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        {expert && (
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
        )}
        <div className="border border-full rounded-full py-3 px-2 bg-green-500">
          <button type="button">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;

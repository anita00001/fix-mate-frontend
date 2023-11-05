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
    <div>
      <Sidebar />
      <div className="flex items-center justify-center">
        {expert && (
          <div key={expert.id}>
            <h2>
              {expert.first_name}
              {' '}
              {expert.last_name}
            </h2>
            <p>{expert.email}</p>
            <p>{expert.address}</p>
            <p>
              Experience:
              {expert.experience}
              {' '}
              years
            </p>
            {renderStatus(expert)}
            <p>
              Fee: $
              {expert.fee}
            </p>
            <p>{expert.name}</p>
            <p>{expert.description}</p>
          </div>
        )}
        <div>
          <button type="button">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;

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
    <>
      <Sidebar />
      <div className="flex items-center justify-center">
        {experts.map((expert) => (
          <div key={expert.id}>
            <p>{expert.first_name}</p>
            <p>{expert.last_name}</p>
            <p>{expert.email}</p>
            <p>{expert.address}</p>
            <p>{expert.experience}</p>
            {renderStatus(expert)}
            <p>{expert.fee}</p>
            <p>{expert.name}</p>
            <p>{expert.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpertDetails;

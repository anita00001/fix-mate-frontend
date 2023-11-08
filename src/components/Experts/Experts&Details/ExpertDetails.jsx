import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchExperts } from '../../../redux/Experts/expertsSlice';
import Sidebar from '../../Navigation/Sidebar';

const ExpertDetails = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);
  const { id } = useParams();
  const expertId = Number(id);
  const expert = experts.find((expert) => expert.id === expertId);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

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
      <div className="flex h-[100vh] items-center justify-center mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -350 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0 }}
          className="flex w-full flex-col items-center justify-between md:ml-24 md:w-[60%] md:flex-col"
        >
          {expert && (
            <div
              key={expert.id}
              className="flex w-full flex-col items-center justify-center space-y-4 md:ml-10 md:flex-row md:space-x-32 md:space-y-0"
            >
              <div className="h-64 w-64 overflow-hidden rounded-full md:h-96 md:w-96 lg:h-128 lg:w-128">
                <motion.img
                  src={expert.image_url}
                  alt={expert.first_name}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div className="space-y-2 text-center md:w-1/2 md:items-end md:text-left">
                <h2 className="text-2xl font-bold text-slate-600">
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
                <p className="text-gray-600">
                  Fee: $
                  {expert.fee}
                </p>
                <p className="text-gray-600">{expert.name}</p>
                <p className="text-gray-600">{expert.description}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end md:ml-[30rem]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => navigate(`/detail_reservation/${expert.id}`)}
              className="hover:g-primary mt-4 rounded bg-primary px-4 py-2 text-white md:mt-10 md:self-end md:px-8 md:py-4 md:text-xl"
            >
              Reserve
            </motion.button>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="mt-4 cursor-pointer rounded bg-primary px-4 py-2 text-white hover:bg-primary md:-ml-48 md:mt-10 md:self-start md:px-8 md:py-4 md:text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ExpertDetails;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="flex h-[100vh] items-center justify-center">
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
              <motion.img
                alt={expert.first_name}
                src="/images/demo.jpg"
                className="h-64 w-[80%] rounded-full object-cover shadow-lg md:h-full md:w-1/2"
                whileHover={{ scale: 1.1 }}
              />
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
            <Link to="/new_reservation">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="hover:g-primary mt-4 rounded bg-primary px-4 py-2 text-white md:mt-10 md:self-end md:px-8 md:py-4 md:text-xl"
              >
                Reserve
              </motion.button>
            </Link>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="hover:bg-primary cursor-pointer mt-4 rounded md:-ml-48 bg-primary px-4 py-2 text-white md:mt-10 md:self-start md:px-8 md:py-4 md:text-xl"
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

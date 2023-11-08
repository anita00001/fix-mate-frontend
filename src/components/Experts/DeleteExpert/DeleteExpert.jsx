import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Sidebar from '../../Navigation/Sidebar';
import { fetchExperts, toggleRemoveExpert } from '../../../redux/Experts/expertsSlice';
import DeleteExpertTable from './DeleteExpertTable';

const DeleteExpert = () => {
  const dispatch = useDispatch();
  const { experts } = useSelector((state) => state.experts);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(fetchExperts()).then(() => setLoading(false));
  }, [dispatch]);

  const handleToggleRemove = (expertId) => {
    dispatch(toggleRemoveExpert(expertId));
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="page px-4 pt-8 md:px-0"
        >
          <h1>Delete Expert</h1>
          <p className="text text mb-10 text-center ">
            These are the list of experts where you can remove the expert.
          </p>
          <DeleteExpertTable
            experts={experts}
            onToggleRemove={handleToggleRemove}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default DeleteExpert;

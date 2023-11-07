import DataTable from 'react-data-table-component';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../redux/Reservations/reservationsSlice';
import Sidebar from '../Navigation/Sidebar';
import { customStyles, theme, columns } from './index';

const Reservations = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservations,
  );

  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const userID = jsonObject.id;

  const filteredReservations = reservations.filter(
    (reservation) => reservation.user_id === userID,
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const formattedData = filteredReservations.map((reservation) => ({
    id: reservation.id,
    expert: `${reservation.expert.first_name} ${reservation.expert.last_name}`,
    image_url: reservation.expert.image_url,
    specialization: reservation.expert.specialization.name,
    expertEmail: reservation.expert.email,
    city: reservation.city,
    date: reservation.date,
    user: reservation.user.name,
  }));

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

  if (error) {
    return (
      <>
        <Sidebar />
        <div className="container">{error}</div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="bg-gray-100">
        <motion.div
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="container"
        >
          <div className="page  px-4 pt-8 md:px-0">
            <h1 className="text-black">My Reservations</h1>
            <p className="text mb-10 text-center text-black">
              These are your reservations that you have made.
            </p>
            <DataTable
              columns={columns}
              data={formattedData}
              pagination
              responsive
              customStyles={customStyles}
              theme={theme}
              fixedHeader
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Reservations;

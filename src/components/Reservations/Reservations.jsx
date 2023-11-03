import DataTable from 'react-data-table-component';
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

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const formattedData = reservations.map((reservation) => ({
    id: reservation.id,
    expert: `${reservation.expert.first_name} ${reservation.expert.last_name}`,
    specialization: reservation.expert.specialization.name,
    expertEmail: reservation.expert.email,
    city: reservation.city,
    date: reservation.date,
    user: reservation.user.name,
  }));

  if (loading === true) {
    return (
      <>
        <Sidebar />
        <div className="page container flex items-center justify-center">
          Loading your reservations...
        </div>
      </>
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
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(152, 191, 17, 0.2), rgba(152, 191, 17, 0.2)), url("./images/kenny-eliason-unsplash.jpg")',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div className="container">
          <div className="page  px-4 pt-8 md:px-0">
            <h1 className="text-white">My Reservations</h1>
            <p className="text mb-10 text-center text-white">
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
        </div>
      </div>
    </>
  );
};

export default Reservations;
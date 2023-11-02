import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/Reservations/reservationsSlice';
import Sidebar from './Sidebar';
import '../styles/reservations.css';

const customStyles = {
  headCells: {
    style: {
      color: 'white',
      backgroundColor: '#98bf11',
    },
  },

};

createTheme('solarized', {
  text: {
    primary: '#000',
  },
  divider: {
    default: '#98bf11',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});
const Reservations = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector((state) => state.reservations);

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

  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
    },
    {
      name: 'Expert Name',
      selector: (row) => row.expert,
    },
    {
      name: 'Specialization',
      selector: (row) => row.specialization,
    }, {
      name: 'Expert Email',
      selector: (row) => row.expertEmail,
    },
    {
      name: 'City',
      selector: (row) => row.city,
    },
    {
      name: 'Reservation Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: (row) => row.user,
    },
  ];

  if (loading === true) {
    return (
      <div className="container page flex justify-center items-center">
        Loading your reservations...
      </div>
    );
  }

  if (error) {
    <div className="container">{error}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="page">
          <h1>My Reservations</h1>
          <p className="text mb-10">
            These are the your reservations that you have made.
          </p>
          <DataTable
            columns={columns}
            data={formattedData}
            pagination
            responsive
            customStyles={customStyles}
            theme="solarized"
            fixedHeader
          />
        </div>
      </div>
    </>
  );
};
export default Reservations;

import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/Reservations/reservationsSlice';
import Sidebar from './Sidebar';

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
      sortable: true,
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
      <>
        <Sidebar />
        <div className="container page flex justify-center items-center">
          Loading your reservations...
        </div>
      </>
    );
  }

  if (error) {
    <div className="container">{error}</div>;
  }

  return (
    <>
      <Sidebar />
      <div style={{
        backgroundImage: 'linear-gradient(rgba(152, 191, 17, 0.2), rgba(152, 191, 17, 0.2)), url("./images/kenny-eliason-unsplash.jpg")',
        backgroundSize: 'cover',
        position: 'relative',
      }}
      >
        <div
          className="container"
        >
          <div className="page  md:px-0 px-4 pt-8">
            <h1 className="text-white">My Reservations</h1>
            <p className="text mb-10 text-center text-white">
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
      </div>
    </>
  );
};
export default Reservations;

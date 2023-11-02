import DataTable from 'react-data-table-component';
import Sidebar from './Sidebar';

const columns = [
  {
    name: 'id',
    selector: (row) => row.id,
  }, {
    name: 'User Name',
    selector: (row) => row.name,
  }, {
    name: 'Expert Name',
    selector: (row) => row.fullName,
  }, {
    name: 'Specialization',
    selector: (row) => row.title,
  }, {
    name: 'Reservation Date',
    selector: (row) => row.title,
  }, {
    name: 'Reserve date',
    selector: (row) => row.title,
  },

];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];
const Reservations = () => (
  <>
    <Sidebar />
    <div className="container">
      <div className="page">
        <h1>My Reservations</h1>
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  </>
);
export default Reservations;

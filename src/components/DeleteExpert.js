import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { fetchExperts, toggleRemoveExpert } from '../redux/Experts/expertsSlice';

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
function DeleteExpert() {
  const dispatch = useDispatch();
  const { experts } = useSelector((state) => state.experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  const formattedData = experts.map((expert) => ({
    id: expert.id,
    name: `${expert.first_name} ${expert.last_name}`,
    specialization: expert.name,
    removed: expert.removed,
  }));

  const handleToggleRemove = (expertId) => {
    dispatch(toggleRemoveExpert(expertId));
  };

  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Specialization',
      selector: (row) => row.specialization,
    },
    {
      name: 'Action',
      selector: (row) => row.removed,
      cell: (row) => (
        <button
          type="button"
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-white hover:text-red-500 hover:transition-colors hover:border hover:border-red-500"
          onClick={() => handleToggleRemove(row.id)}
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="page md:px-0 px-4 pt-8">
          <h1>
            Delete Expert
          </h1>
          <p className="text mb-10 text-center text ">
            These are the list of experts where you can remove the expert.
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
}
export default DeleteExpert;

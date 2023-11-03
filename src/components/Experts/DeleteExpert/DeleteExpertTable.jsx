import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';

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

function DeleteExpertTable({ experts, onToggleRemove }) {
  const formattedData = experts.map((expert) => ({
    id: expert.id,
    name: `${expert.first_name} ${expert.last_name}`,
    specialization: expert.name,
    removed: expert.removed,
  }));

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
          onClick={() => onToggleRemove(row.id)}
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={formattedData}
      pagination
      responsive
      customStyles={customStyles}
      theme="solarized"
      fixedHeader
    />
  );
}

export default DeleteExpertTable;

DeleteExpertTable.propTypes = {
  experts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    specialization_id: PropTypes.number.isRequired,
  })).isRequired,
  onToggleRemove: PropTypes.func.isRequired,
};

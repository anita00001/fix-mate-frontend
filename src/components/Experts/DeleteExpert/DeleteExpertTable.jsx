import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { LuTrash2 } from 'react-icons/lu';

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

const renderImageCell = (cellData, alt) => (
  <div className="my-4 flex h-10 w-10 items-center justify-center bg-contain">
    <img src={cellData} alt={alt} className="rounded-full" />
  </div>
);
const DeleteExpertTable = ({ experts, onToggleRemove }) => {
  const formattedData = experts.map((expert) => ({
    id: expert.id,
    name: `${expert.first_name} ${expert.last_name}`,
    specialization: expert.name,
    image_url: expert.image_url,
    removed: expert.removed,
  }));

  const columns = [
    {
      name: 'id',
      selector: (row) => <div className="text-slate-500">{row.id}</div>,
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row) => renderImageCell(row.image_url, row.name),
    },
    {
      name: 'Name',
      selector: (row) => (
        <div className="font-semibold text-slate-500">{row.name}</div>
      ),
    },
    {
      name: 'Specialization',
      selector: (row) => (
        <div className="font-semibold text-slate-500">{row.specialization}</div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => row.removed,
      cell: (row) => (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 2 }}
          type="button"
          onClick={() => onToggleRemove(row.id)}
          className=" ml-4 text-lg text-red-700 transition-colors hover:text-red-500"
        >
          <LuTrash2 />
        </motion.button>
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
};

DeleteExpertTable.propTypes = {
  experts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      fee: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      specialization_id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onToggleRemove: PropTypes.func.isRequired,
};

export default DeleteExpertTable;

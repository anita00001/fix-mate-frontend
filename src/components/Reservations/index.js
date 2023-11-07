import { createTheme } from 'react-data-table-component';

const renderCell = (cellData) => (cellData || 'N/A');
const renderImageCell = (cellData) => (
  <div className="my-4 flex h-10 w-10 items-center justify-center bg-contain">
    <img src={cellData} alt={cellData} className="rounded-full" />
  </div>
);
export const customStyles = {
  headCells: {
    style: {
      color: 'white',
      backgroundColor: '#98bf11',
    },
  },
};

export const theme = createTheme('solarized', {
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

export const columns = [
  {
    name: 'id',
    selector: (row) => row.id,
    sortable: true,
  }, {
    name: 'Image',
    selector: (row) => row.image_url,
    cell: (row) => renderImageCell(row.image_url),
  },
  {
    name: 'Expert Name',
    selector: (row) => row.expert,
    cell: (row) => renderCell(row.expert),
  },
  {
    name: 'Specialization',
    cell: (row) => renderCell(row.specialization),
  },
  {
    name: 'Expert Email',
    cell: (row) => renderCell(row.expertEmail),
  },
  {
    name: 'City',
    cell: (row) => renderCell(row.city),
  },
  {
    name: 'Reservation Date',
    cell: (row) => renderCell(row.date),
    sortable: true,
  },
  {
    name: 'User Name',
    cell: (row) => renderCell(row.user),
  },
];

import { createTheme } from 'react-data-table-component';

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
  },
  {
    name: 'Expert Name',
    selector: (row) => row.expert,
  },
  {
    name: 'Specialization',
    selector: (row) => row.specialization,
  },
  {
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

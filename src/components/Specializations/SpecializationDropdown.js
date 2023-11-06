import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSpecializations } from '../../redux/Specializations/specialitiesSlice';

const SpecializationDropdown = ({ formData, onChange }) => {
  const dispatch = useDispatch();
  const specializations = useSelector((state) => state.specialization.specializations);

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  return (
    <select
      name="specialization_id"
      value={formData.specialization}
      onChange={onChange}
    >
      <option value="">Select Specialization</option>
      {specializations.map((specialization) => (
        <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
      ))}
    </select>
  );
};

export default SpecializationDropdown;

SpecializationDropdown.propTypes = {
  formData: PropTypes.shape({
    specialization: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fetchSpecializations } from '../../redux/Specializations/specialitiesSlice';

const SpecializationDropdown = ({ formData, onChange }) => {
  const dispatch = useDispatch();
  const specializations = useSelector((state) => state.specialization.specializations);

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  return (
    <motion.select
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2 }}
      className="focus:shadow-outline mb-4 w-full rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors  focus:outline-none"
      required
      name="specialization_id"
      value={formData.specialization}
      onChange={onChange}
    >
      <option value="">Select Specialization</option>
      {specializations
        && Array.isArray(specializations)
        && specializations.map((specialization) => (
          <option key={specialization.id} value={specialization.id}>
            {specialization.name}
          </option>
        ))}
    </motion.select>
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

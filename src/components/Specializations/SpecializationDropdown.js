import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecializations } from '../../redux/Specializations/specialitiesSlice';

const SpecializationDropdown = () => {
  const dispatch = useDispatch();
  const specializations = useSelector((state) => state.specialization.specializations);

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  return (
    <select>
      <option value="">Select Specialization</option>
      {specializations.map((specialization) => (
        <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
      ))}
    </select>
  );
};

export default SpecializationDropdown;

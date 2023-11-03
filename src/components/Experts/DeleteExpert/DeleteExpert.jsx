import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Navigation/Sidebar';
import { fetchExperts, toggleRemoveExpert } from '../../../redux/Experts/expertsSlice';
import DeleteExpertTable from './DeleteExpertTable';

function DeleteExpert() {
  const dispatch = useDispatch();
  const { experts } = useSelector((state) => state.experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  const handleToggleRemove = (expertId) => {
    dispatch(toggleRemoveExpert(expertId));
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="page px-4 pt-8 md:px-0">
          <h1>Delete Expert</h1>
          <p className="text text mb-10 text-center ">
            These are the list of experts where you can remove the expert.
          </p>
          <DeleteExpertTable
            experts={experts}
            onToggleRemove={handleToggleRemove}
          />
        </div>
      </div>
    </>
  );
}
export default DeleteExpert;

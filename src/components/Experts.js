import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { fetchExperts } from '../redux/Experts/ExpertsSlice';
import '../styles/Experts.css';

const Experts = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);
  // const specializations = useSelector((state) => state.experts.specializations);
  // console.log(experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  return (
    <div className="expert-page">
      <h1>Meet our Experts</h1>
      <ul className="ul">
        {experts.map((expert) => (
          <li key={expert.id}>
            <img alt={expert.first_name} src={expert.image} />
            <br />
            <div className="social-media">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </div>
            {'Name: '}
            {expert.first_name}
            {' '}
            {expert.last_name}
            <br />
            {'Specialization: '}
            {expert.name }
            <br />
            {'Status: '}
            {expert.status ? 'Available' : 'Not available, please check later'}
            <br />
            <button type="submit" className="detail-btn">Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experts;

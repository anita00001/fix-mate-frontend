import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { fetchExperts } from '../../../redux/Experts/expertsSlice';
import Sidebar from '../../Navigation/Sidebar';
import '../../../styles/Experts.css';

const Experts = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="expert-page page">
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
              {expert.last_name}
              <br />
              {'Specialization: '}
              {expert.name}
              <br />
              {'Status: '}
              {expert.status
                ? 'Available'
                : 'Not available, please check later'}
              <br />
              <Link to={`/experts/${expert.id}`}>
                <button type="submit" className="detail-btn">
                  Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Experts;
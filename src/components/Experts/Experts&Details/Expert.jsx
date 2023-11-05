import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { fetchExperts } from '../../../redux/Experts/expertsSlice';
import Sidebar from '../../Navigation/Sidebar';
import '../../../styles/Experts.css';
import '../../../styles/swiperCustom.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Experts = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="page sm:mt-12">
        <h1 className="text-3xl font-bold ">Meet our Experts</h1>
        <p className="text-lg text-gray-600">Please select a Experts</p>
        <span className="font-thin text-slate-500">
          ............................
        </span>
        <Swiper
          className="container"
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          scrollbar={{ draggable: true }}
          loop
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1124: {
              slidesPerView: 3,
            },
          }}
        >
          {experts.map((expert) => (
            <SwiperSlide
              key={expert.id}
              className="slide z-10 w-[80%] rounded  hover:bg-green-100"
            >
              <Link to={`/experts/${expert.id}`} className="w-3/6">
                <motion.div
                  initial={{ x: 300, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  className="mx-auto mt-10 flex w-[60%] flex-col items-center text-center"
                >
                  <img
                    alt={expert.first_name}
                    src="./images/demo.jpg"
                    className="rounded-lg shadow-lg"
                  />
                  <span className="font-thin text-slate-500">
                    ............................
                  </span>
                  <span className="font-semibold">
                    {`${expert.first_name} ${expert.last_name}`}
                  </span>
                  <br />
                  <span className="font-light">
                    Specialization:
                    <span className="font-light text-slate-400">
                      {` ${expert.name}`}
                    </span>
                  </span>
                  <br />
                  {'Status: '}
                  {expert.status ? 'Available' : 'Not available'}
                  <br />
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Experts;

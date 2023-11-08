import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiFacebookLogoBold, PiInstagramLogoBold } from 'react-icons/pi';
import { TiSocialTwitterCircular } from 'react-icons/ti';
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
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(fetchExperts()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ x: ['-100%', '100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#98bf11',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="page bg-gray-100 pt-8">
        <h1 className="text-3xl font-bold">Meet our Experts</h1>
        <p className="text-lg text-gray-600 ">
          {experts.length === 0
            ? 'No expert available. Please add a new expert'
            : 'Please select an Expert'}
        </p>
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
              <Link to={`/${expert.id}`} className="w-3/6">
                <motion.div
                  initial={{ x: 300, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  className="mx-auto mt-10 flex w-[60%] flex-col items-center text-center"
                >
                  <div className="h-32 w-32 overflow-hidden rounded-full">
                    <img
                      src={expert.image_url}
                      alt={expert.first_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-thin text-slate-500">
                    ............................
                  </span>
                  <span className="font-semibold">
                    {`${expert.first_name} ${expert.last_name}`}
                  </span>
                  <span className="font-light">
                    Specialization:
                    <span className="font-light text-slate-400">
                      {` ${expert.name}`}
                    </span>
                  </span>
                  {'Status: '}
                  {expert.status ? 'Available' : 'Not available'}
                  <br />
                  <div className="mt-1 flex text-2xl opacity-50">
                    <span>
                      <PiFacebookLogoBold />
                    </span>
                    <span>
                      <TiSocialTwitterCircular />
                    </span>
                    <span>
                      <PiInstagramLogoBold />
                    </span>
                  </div>
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

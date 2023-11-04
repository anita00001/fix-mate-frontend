import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { fetchExperts } from '../../../redux/Experts/expertsSlice';
import Sidebar from '../../Navigation/Sidebar';
import '../../../styles/Experts.css';
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
      <div className="page">
        <h1>Meet our Experts</h1>
        <Swiper
          className="container"
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
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
              className="slide z-10 rounded hover:bg-green-200"
            >
              <Link to={`/experts/${expert.id}`}>
                <div className="mx-auto mt-20 flex w-[70%] flex-col items-center text-center ">
                  <img alt={expert.first_name} src={expert.image} />
                  <br />
                  <span className="font-semibold">
                    {expert.first_name}
                    {expert.last_name}
                  </span>
                  <br />
                  <span className="font-light">
                    Specialization:
                    <span className="font-light text-slate-400">
                      {expert.name}
                    </span>
                  </span>
                  <br />
                  {'Status: '}
                  {expert.status
                    ? 'Available'
                    : 'Not available, please check later'}
                  <br />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Experts;

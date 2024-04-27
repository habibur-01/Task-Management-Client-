import { Swiper, SwiperSlide } from 'swiper/react';
import { RiDoubleQuotesL } from "react-icons/ri";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import useAxiosPublic from "../../../api/AxiosPublic/useAxiosPublic";
import BannerTitle from "../../../Comonents/BannerTitle/BannerTitle";


const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/reviews')
            .then(res => {
                setReviews(res.data)
            }).catch(err => {
                console.log(err)
            })

    }, [axiosPublic])
    // console.log(reviews)
    return (
        <div className="my-20">
            <div >
                <BannerTitle heading={'Testimonials'} subHeading={'What Our Clients Say'}></BannerTitle>
            </div>
            <div className="lg:m-10 flex justify-center">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1168: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {
                        reviews?.map(review =>
                            <SwiperSlide key={review._id}>
                                <div className="mx-4 my-8 lg:m-14 p-10 text-left bg-gradient-to-br from-[#f2f2ff] via-[#fbfbff] to-[#eaffec] md:w-80 lg:w-96 rounded-3xl">
                                    <div>
                                        <h2 className='text-xl pb-5 opacity-60 text-gray-500'>Review</h2>
                                        <p className='text-lg font-medium'>{review.details.slice(0, 110) + ' ...'}</p>

                                    </div>
                                    <div className="flex space-x-3">
                                        <Rating
                                            style={{ maxWidth: 80 }}
                                            value={review.rating}
                                            readOnly
                                        />
                                        <p className='text-xs font-semibold py-5 '>{review.rating}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4 items-center'>
                                            <img src={review.image} className='w-14 h-14 overflow-hidden border-2 rounded-full' alt="" />
                                            <h3 className="text-base text-[#ff9f9f]">{review.name}</h3>
                                        </div>

                                        <div className="flex justify-center my-6">
                                            <RiDoubleQuotesL size={20} />
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>)
                    }

                </Swiper>
                {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => 
                    }


                </Swiper> */}
            </div>

        </div>
    );
};

export default Testimonials;
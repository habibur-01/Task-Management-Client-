import { Swiper, SwiperSlide } from 'swiper/react';
import { RiDoubleQuotesL } from "react-icons/ri";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
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
        .then(res=>{
            setReviews(res.data)
        }).catch(err=>{
            console.log(err)
        })
            
    }, [axiosPublic])
    // console.log(reviews)
    return (
        <div className="my-20">
            <div >
                <BannerTitle heading={'Testimonials'} subHeading={'What Our Clients Say'}></BannerTitle>
            </div>
            <div className="m-10">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="m-20 text-center">
                                <div className="flex justify-center">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-center my-6">
                                    <RiDoubleQuotesL size={70}/>
                                </div>
                                <p>{review.details}</p>
                                <h3 className="text-2xl text-[#ff9f9f]">{review.name}</h3>
                            </div>

                        </SwiperSlide>)
                    }


                </Swiper>
            </div>

        </div>
    );
};

export default Testimonials;
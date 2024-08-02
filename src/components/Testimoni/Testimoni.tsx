"use client"
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const listTestimoni = [
  {
    name: "iezh Robert",
    image: "/people-3.png",
    city: "Warsaw",
    country: "Poland",
    rating: "4.5",
    testimoni:
      "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
  },
  {
    name: "iezh Robert",
    image: "/people-3.png",
    city: "Warsaw",
    country: "Poland",
    rating: "4.5",
    testimoni:
      "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
  },
  {
    name: "iezh Robert",
    image: "/people-3.png",
    city: "Warsaw",
    country: "Poland",
    rating: "4.5",
    testimoni:
      "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
  },
  {
    name: "iezh Robert",
    image: "/people-3.png",
    city: "Warsaw",
    country: "Poland",
    rating: "4.5",
    testimoni:
      "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
  },
]

const Testimoni = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, []);

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          770: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((testimonia, index) => (
          <SwiperSlide className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={testimonia.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 capitalize">
                      {testimonia.name}
                    </p>
                    <p className="text-sm text-black-500 capitalize">
                      {testimonia.city}, {testimonia.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{testimonia.rating}</p>
                  <span className="flex ml-4">
                    <Image alt="" src={"/Icon/stars.svg"} width={100} height={100} className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{testimonia.testimoni}”.</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className={`mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border transition-all text-orange-500 cursor-pointer ${isBeginning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white-500'}`}
            onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
          >
            <Image alt="" src={"/Icon/eva_arrow-back-fill.svg"} width={100} height={100} className="h-6 w-6" />
          </div>
          <div
            className={`flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border transition-all text-orange-500 cursor-pointer ${isEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white-500'}`}
            onClick={() => !isEnd && swiperRef.current?.slideNext()}
          >
            <Image alt="" src={"/Icon/eva_arrow-next-fill.svg"} width={100} height={100} className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;

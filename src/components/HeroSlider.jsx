import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/banners/banner1.png",
    caption: "Site Launch!!!",
  },
  {
    image: "/banners/banner2.png",
    caption: "🎁 Diwali Sale!",
  },
  {
    image: "/banners/banner3.png",
    caption: "🔥 Up to 70% Off!",
  },
];




const HeroSlider = () => {
  return (
    <div className="max-w-6xl mx-auto mt-4 rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.caption}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
                {slide.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  const images = [
    "/assets/images/hero2.png", // Add more image paths here
    "/assets/images/hero3.png",
    "/assets/images/hero4.png"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-5">
      {/* Image Section */}
      <div className="w-full h-[70vh] md:h-[80vh] relative">
        <Image 
          src={images[currentImage]} 
          alt="hero" 
          layout="fill" 
          objectFit="cover" 
          className="absolute top-0 left-0" 
        />
      </div>

      {/* Text and Button Section */}
      <div className="wrapper flex flex-col justify-center items-center gap-4 mt-5 md:mt-10">
      <div className="flex flex-col justify-center items-center text-center">
         <h1 className="h1-bold pb-5">
         Host events, share ideas, and <br /> grow your network!
         </h1>
         <p className="p-regular-20 md:p-regular-24 pb-7">Ready to break the monotony? <br/>
         Host epic events, share wild ideas, and expand your squad at IGDTUW! </p>
         <h5 className="h5-bold pb-10 text-pink-700"> Let’s make networking less awkward and more awesome! 🤩</h5>
         <Button size="lg" asChild className="button w-full sm:w-fit">
            <Link href="#events">
            Take me to events!
            </Link>
         </Button>
      </div>
      </div>


    </section>
  );
};

export default HeroSection;

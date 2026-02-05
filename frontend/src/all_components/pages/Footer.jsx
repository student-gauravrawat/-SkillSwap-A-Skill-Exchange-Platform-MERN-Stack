import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { FaTwitterSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <>
      <footer className="w-full bg-[#F4F6FF] text-[#2B2B2B] py-10 px-6 md:px-20 md:mt-25 md: ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:mt-8 lg:max-gap-20 lg:min-gap-10 md:max-gap-21 md:min-gap-1 sm:gap-18  sm:min-gap-5">
            <div className="space-y-5 w-full md:w-[30%] md:-mt-3.75 md:-ml-5">
              <img src="/skilllogo.png" alt="logo" className="w-25 md:w-40 md:-mb-2 -mb-0.5 -ml-4"/>

              <div className="flex items-center gap-2 text-sm ">
                <span className="text-base"><MdEmail className="inline"/></span> hello@skillbridge.com
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-base"><IoMdCall className="inline"/></span> +91 91813 23 2309
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-base"><FaLocationDot className="inline"/></span> Somewhere in the World
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-semibold text-[25px] ">Home</h1>
              <p className="text-sm cursor-pointer hover:text-gray-600">Benefits</p>
              <p className="text-sm cursor-pointer hover:text-gray-600">
                Our Courses
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-600">
                Our Testimonials
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-600">Our FAQ</p>
            </div>

            <div className="space-y-3">
              <h1 className="font-semibold text-[25px]">About Us</h1>
              <p className="text-sm cursor-pointer hover:text-gray-600"></p>
              <p className="text-sm cursor-pointer hover:text-gray-600">
                Achievements
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-600">
                Our Goals
              </p>
            </div>

            <div className="space-y-3">
              <h1 className="font-semibold text-[25px]">Social Profiles</h1>
              <div className="flex gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow hover:shadow-md cursor-pointer">
                  <IoLogoFacebook  className="w-8 h-8"/>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow hover:shadow-md cursor-pointer">
                  <FaTwitterSquare className="w-8 h-8"/>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow hover:shadow-md cursor-pointer">
                  <AiFillInstagram className="w-8 h-8"/>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-10">
            © 2025 Skillbridge. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

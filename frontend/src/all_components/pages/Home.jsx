import React from "react";
import {Link} from "react-router-dom"

function Home() {
  return (
    <div className="w-full text-[#2B2B2B] mt-16 sm:mt-15 lg:mt-12">
      {/* ---------- HERO SECTION ---------- */}
      <section className=" sm:flex justify-between mt-1.5">
        <div className=" sm:hidden flex  justify-center p-3">
          <img
            src="/image3.png"
            alt="heroImage"
            className="w-130 h-83.75 min-w-81.75"
          />
        </div>

        <div className=" lg:gap-50 lg:min-gap-30 sm:gap-10 sm:mr-1.5 flex justify-between  items-center mx-auto">
          <div className="mt-3.5 ml-3.5   ">
            <h1 className="text-3xl sm:text-[23px] md:text-[30px] lg:text-[45px]  leading-tight font-medium  text-[#005bff]  ">
              Swap Your Talents. <br />
              Learn Something New. <br />
              Empower Each Other
            </h1>
            <p className="mt-4 text-sm md:text-[15px] lg:text-[18px] md:font-light sm:text-[70%] max-w-md lg:min-text-[13px]">
              Skill Swap is a community where people share what they know and
              learn what they love — without spending money. Teach your skills,
              discover new talents, and grow together with real people who want
              to exchange knowledge.
            </p>
            <button className="mt-5 bg-[#005bff] text-white text-[18px]  w-23 h-auto px-5 py-2 rounded-md shadow hover:shadow-lg transition lg:w-45 lg:h-12 md:w-42 md:text-xl lg:text-2xl font-medium cursor-pointer hover:shadow-blue-500 hover:border-black border  ">
               <Link to="/skilledit">
                     skill+
               </Link>
            </button>
          </div>

          <div className="hidden sm:block lg:mr-2 ">
            <img
              src="/image1.png"
              alt="heroImage"
              className=" lg:w-198.75 lg:h-120 sm:w-137.5 sm:h-62.5 md:w-125 md:h-70 lg:min-w-76.25 lg:min-h-107.5"
            />
          </div>
        </div>
      </section>

      {/* ---------- PRODUCT OVERVIEW ---------- */}
      <section>
        <div className=" mt-8 m-2 space-y-8 sm:space-y-6 ">

        {/* Project overview */}
          <div className=" sm:flex sm:flex-row-reverse sm:justify-between sm:items-center gap-15">
            <div className=" sm:mr-3 lg:mr-5">
              <div className="flex gap-2 items-center ml-1">
                <img
                  src="/divider.png"
                  alt="divider"
                  className="w-1.5 h-5.5 lg:w-2.5 lg:h-11"
                />
                <h2 className="text-xl md:text-xl font-semibold lg:text-4xl">
                  Product Overview
                </h2>
              </div>
              <ol className=" mt-3.5 sm:mr-2 sm:mt-5.5 md:text-[13px] sm:text-[10px] lg:text-[16px] list-decimal ml-5 space-y-2 sm:space-y-3 ">
                <li>
                  Users can share their knowledge and learn new things from
                  others without paying money. Just exchange your skills.
                </li>
                <li>
                  Chat with skill partners, schedule sessions, and plan your
                  learning exchange smoothly.
                </li>
                <li>
                  Join a helpful community where people support each other’s
                  growth through knowledge sharing.
                </li>
              </ol>
            </div>

            <div className=" mt-2 mr-2 sm:ml-4 lg:ml-15 flex justify-end lg:mr-5 ">
              <img
                src="/homeimage1.png"
                alt="productOverviewImage"
                className="w-39.5 h-28.75 lg:max-w-75 lg:h-50 md:w-68.75 md:h-37.5 sm:h-30 sm:w-42.5"
              />
            </div>
          </div>

        {/*Problem */}
          <div className=" sm:flex  sm:justify-between sm:items-center gap-15 space-y-8 mt-8 sm:ml-8 sm:mt-15">
            <div className=" sm:mr-3 lg:mr-5">
              <div className="flex gap-2 items-center ml-1">
                <img
                  src="/divider.png"
                  alt="divider"
                  className="w-1.5 h-5.5 lg:w-2.5 lg:h-11"
                />
                <h2 className="text-xl md:text-xl font-semibold lg:text-4xl">
                  Challenges in Today’s Learning World
                </h2>
              </div>
              <ol className=" mt-3.5 sm:mr-2 sm:mt-5.5 md:text-[13px] sm:text-[10px] lg:text-[16px] list-decimal ml-5 space-y-2 sm:space-y-3 ">
                <li>High Cost of Learning New Skills. Many people want to learn coding, design, music, cooking, but courses, bootcamps, and tutors are too expensive.</li>
                <li>Lack of Access to Expert Mentors. Small towns, rural areas, or students without a network often can't find experts.</li>
                <li>Motivation Problem in Self-Learning. Today, People start watching YouTube tutorials, but quit quickly because 
                <span className=" font-medium "> No guidance</span>,  
                <span className=" font-medium"> No real interaction</span>.
                </li>
              </ol>
            </div>

            <div className=" mt-2 mr-2 sm:ml-4 lg:ml-15 flex justify-end lg:mr-5 ">
              <img
                src="/homeimage2.png"
                alt="productOverviewImage"
                className="w-39.5 h-28.75 lg:max-w-75 lg:h-50 md:w-68.75 md:h-37.5 sm:h-30 sm:w-42.5"
              />
            </div>
          </div>

         {/* Problem solution */}
          <div className=" sm:flex sm:flex-row-reverse sm:justify-between sm:items-center gap-15">
            <div className=" sm:mr-3 lg:mr-5">
              <div className="flex gap-2 items-center ml-1">
                <img
                  src="/divider.png"
                  alt="divider"
                  className="w-1.5 h-5.5 lg:w-2.5 lg:h-11"
                />
                <h2 className="text-xl md:text-xl font-semibold lg:text-4xl">
                  Why Skill Swap Is Needed?
                </h2>
              </div>
              <ol className=" mt-3.5 sm:mr-2 sm:mt-5.5 md:text-[13px] sm:text-[10px] lg:text-[16px] list-decimal ml-5 space-y-2 sm:space-y-3 ">
                <li>Users can learn anything without paying money — they exchange skills instead of buying courses.</li>
                <li>Your app connects users to professionals, hobbyists, and skilled learners worldwide — creating equal learning opportunities.</li>
                <li>Your app creates a friendly learning network where users support each other's growth.</li>
              </ol>
            </div>

            <div className=" mt-2 mr-2 sm:ml-4 lg:ml-15 flex justify-end lg:mr-5 ">
              <img
                src="/homeimage3.png"
                alt="productOverviewImage"
                className="w-39.5 h-28.75 lg:max-w-75 lg:h-50 md:w-68.75 md:h-37.5 sm:h-30 sm:w-42.5"
              />
            </div>
          </div>

        </div>
      </section>

      {/*Platfrom benefits */}
      <section className="mt-5 sm:mt-11 ">
         <h2 className="text-2xl md:text-3xl font-semibold text-start sm:text-center mx-auto ml-3 md:ml-8 sm:text-[#010815] text-blue-600  ">  
           Platfrom Benefits
         </h2>
         <p className=" text-sm text-gray-600 mt-2 sm:mt-3 text-start sm:text-center md:text-center max-w-2xl mx-auto  ml-3 md:ml-auto ">
         SkillSwap lets everyone share what they know and learn what they need through skill exchange. </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 sm:5.5 ml-2 mr-2">
          
          {[
            {
              title: "Flexible Learning Schedule",
              para: "Your time, your pace, your learning."
            },
            {
              title: "Zero-Cost Learning",
              para: "Users can learn anything without paying money — they exchange skills instead of buying courses."
            },
            {
              title: "Access to Real Mentors & Experts",
              para: "Your platform connects them directly with skilled people all over the world."
            },
            {
              title: "Make Use of Your Hidden Skills",
              para: "Skill Swap helps them use their skills in exchange for what they want to learn"
            },
            {
              title: "Build a Learning Community",
              para: "Skill Swap builds a learning community where people help each other."
            },
            {
              title: "Productive Use of Free Time",
              para: "your app encourages meaningful skill exchange and productivity."
            }
          ].map((benifit, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition "
            >
              <h3 className="text-3xl font-bold text-gray-300">{`0${idx + 1}`}</h3>
              <p className="mt-2 text-sm md:text-base font-medium text-[#2B2B2B]">
                {benifit.title}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {benifit.para}
              </p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

export default Home;

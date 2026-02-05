import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mt-20 sm:mt-26">
      {/* About Section */}
      <section className=" mx-auto px-5  mt-5 sm:mt-10 md:ml-2 md:mr-2">
        <div className="grid md:grid-cols-2 lg:gap-38 md:gap-23 space-y-8 items-center">
          <div>
            <img
              src="/about.png"
              alt="aboutImage"
              className="hidden sm:block w-full h-60 md:w-145 md:h-80 rounded-xl"
            />
            <img
              src="/about1.png"
              alt="aboutImage1"
              className=" w-full h-50  rounded-xl sm:hidden"
            />
          </div>

          <div className=" sm:mt-2">
            <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold text-[#031137] mb-4 md:text-[30px]">
              About Skill Swap
            </h2>

            <h5 className="text-[19px] lg:text-[27px] font-medium sm:mt-5  sm:text-[#222328] text-gray-815 md:text-[20px]">
              SkillSwap is a community-driven platform where people share what
              they know and learn what they don’t — all through simple skill
              exchange.
            </h5>

            <p className="text-gray-600 leading-relaxed text-[16px] sm:mt-4 mt-2.5 md:text-[15px]">
              Our mission is to bring learners and creators together, empowering
              everyone to grow without traditional barriers like high fees or
              limited access. Whether you want to teach a skill you’re good at
              or explore something completely new, SkillSwap helps you connect
              with the right people. Here, knowledge becomes a shared resource —
              you give a skill, you gain a skill, and together we build a
              supportive space for continuous learning.
            </p>
          </div>
        </div>
      </section>

      {/* Achievment Section */}
      <section className=" mt-4 ml-3 mr-3 sm:mt-7 ">
        <div className="mb-3 sm:ml-7  ml-1.5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#031137] "> Achievements</h2>
          <p> Our excellence has led us to achieve significant milestones.</p>
        </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-3 sm:mt-7 sm:ml-2 sm:mr-3">
            <AchievementCard
              icon="🌍"
              title="Global Connectivity"
              text="People from different places can interact and learn from each other without boundaries."
            />

            <AchievementCard
              icon="📚"
              title="Diverse Learning Categories"
              text="From tech to art, users can explore a wide range of skills based on their interests."
            />

            <AchievementCard
              icon="😊"
              title="Zero-Cost Learning Platform"
              text="Learn anything without paying — just exchange skills with others."
            />

            <AchievementCard
              icon="🔐"
              title="Verified & Trustworthy User Profiles"
              text="Secure verification ensures authentic and reliable learning partners."
            />
          </div>
      </section>

      {/* Goals Section */}
       <section className=" mt-4 ml-3  sm:mt-7 ">
        <div className="mb-3 sm:ml-7 ml-3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#031137] ">Goals</h2>
          <p> Our mission is to redefine how people learn by enabling them to exchange real skills with real people. We’re here to make learning social, affordable, and accessible for everyone.</p>
        </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-3 sm:mt-7 sm:ml-3 sm:mr-3">
            <AchievementCard
              icon="🎯"
              title="Empower People to Share Their Skills"
              text="Give users a platform where they can easily offer what they know and learn what they don’t."
            />

            <AchievementCard
              icon="🔄"
              title="Create a Fair Skill-Exchange System"
              text="Enable users to exchange knowledge without money — a value-for-value learning model."
            />

            <AchievementCard
              icon="⚡"
              title="Encourage Practical, Hands-On Learning"
              text="Help users learn real-world skills through direct interaction instead of traditional classroom methods."
            />

            <AchievementCard
              icon="🛠️"
              title="Simplify the Skill-Matching Process"
              text="Use smart matching so users quickly find the right person to learn from or teach."
            />
          </div>
      </section>


      {/* CTA Section */}
      <section className="bg-[#E9ECFF] py-12 px-5 md:px-10 mt-5">
          <div className="max-w-5xl mx-auto p-6 md:p-10 rounded-xl bg-white shadow-md flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#0047FF]">
              Together, let’s shape the future of digital innovation
            </h2>

            <p className="text-gray-600 mt-2">
              Join us in the exciting journey of learning and growth.
            </p>
          </div>

          <button className="px-6 py-3 bg-[#0047FF] text-white font-semibold rounded-lg hover:bg-[#0033CC] transition">
             <Link to="/skilledit">
                Skill+
             </Link>
          </button>

        </div>
      </section>

    </div>
  );
}

export default About;

function AchievementCard({ icon, title, text }) {
  return (
    <div className="bg-[#F4F6FF] rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useGetUser } from "../../hooks/GetUser";
import { addLearningSkill, deleteLearningSkill } from "../../services/skill.service";

function SkillEditLearn() {
  const { authUser } = useSelector((state) => state.user);
  const getUser = useGetUser()
  const [skill, setSkill] = useState({
    skillname: "",
    level: "",
  });

  const handleAddSkill = async (e) => {
    e.preventDefault();
    // console.log(skill)
    try {
      await addLearningSkill(skill)
      await getUser(authUser._id)

    } catch (error) {
        console.log(error)

    } finally {
          setSkill({
            skillname: "",
            level: "",
         });
    }
  };

  const deleteHandler = async (id) => {
    
    try {
      await deleteLearningSkill(id)
      await getUser(authUser._id)
      
    } catch (error) {
       console.log(error)
    }
  };

  return (
    <div className="mt-20 sm:mt-25 px-4 sm:px-6 lg:px-10 ">
      <section className="bg-white rounded-3xl  p-5 sm:p-8 lg:p-10 max-w-4xl mx-auto sm:shadow-2xl">
        {/* Title */}
        <h2 className="text-xl font-bold text-indigo-600 mb-3 border-l-4 border-indigo-600 pl-3 flex space-x-1.5">
          Add Learning Skills
        </h2>

        <form onSubmit={handleAddSkill} className="space-y-6 sm:space-y-8">
          {/* Skill Name */}
          <div>
            <label className="block text-[16px] sm:text-[18px] font-medium">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="Enter skill name"
              required
              value={skill.skillname}
              onChange={(e) =>
                setSkill({ ...skill, skillname: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2.5 mt-2 
                          bg-[#f5f5fc]
                          focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-[16px] sm:text-[18px] font-medium">
              Level
            </label>
            <select
              value={skill.level}
              required
              onChange={(e) => setSkill({ ...skill, level: e.target.value })}
              className="w-full  border rounded-lg px-4 py-2.5 mt-2
                          bg-[#f5f5fc]
                          focus:border-blue-500 focus:outline-none"
            >
              <option disabled hidden value="">
                Select Your Skill Level
              </option>
              <option>Beginner</option>
              <option>Intermidiate</option>
              <option>Advance</option>
            </select>
          </div>
          <div className="text-center">
            <button className="w-30 h-10 bg-indigo-600 text-white font-medium cursor-pointer  rounded-sm  hover:bg-indigo-600 hover:shadow-xl hover:scale-105">
              Add+
            </button>
          </div>
        </form>

        <section className="mt-5 sm:10">
          <h2 className="text-xl font-bold text-indigo-600 mb-3 border-l-4 border-indigo-600 pl-3 flex space-x-1.5">
            Remove Skills
          </h2>

          <div className=" grid sm:grid sm:grid-cols-3 mt-4 ml-2 sm:mt-5 gap-3 sm:gap-3 ">
            {authUser.learningskills.map((skill) => (
              <div
                key={skill._id}
                className="mr-2 flex justify-between items-center group"
              >
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 sm:px-4 sm:py-2 text-blue-800 shadow-sm border border-blue-200">
                  <span className="text-sm sm:text-base font-medium capitalize">
                    {skill.skillname}
                  </span>
                  <span className="ml-2 text-[10px] sm:text-xs text-blue-600 font-normal italic">
                    {skill.level}
                  </span>
                </div>
                <button
                  onClick={() => deleteHandler(skill._id)}
                  type="button" // Type button zaroori hai taki form submit na ho
                  className="ml-2 bg-red-400 hover:bg-red-500 text-white rounded-md p-1.5 sm:p-2 transition-all hover:scale-110 shadow-sm flex items-center justify-center"
                >
                  <AiOutlineDelete className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default SkillEditLearn;

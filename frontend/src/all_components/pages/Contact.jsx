import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast"

function Contact() {
  const form = useRef();
  const phoneRef = useRef()
  const [phoneError, setPhoneError] = useState("")

  const sendEmail = (e) => {

    e.preventDefault();
    const phone = phoneRef.current.value.trim()

  if(!phone){
      setPhoneError("⚠ Phone number is required")
      return
  }
  if(!/^[0-9]{10}$/.test(phone)){
      setPhoneError("⚠ Only numbers allowed")
      return
  }
  if(phone.length < 10 || phone.length > 10){
       setPhoneError("⚠ Phone number must be 10 digits")
       return
  }
  
   setPhoneError("")

  
    emailjs.sendForm(
        "service_s6l4gjr",
        "template_qehv9za",
        form.current,
        "J7pSTBP2by66X7aAN"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          toast.success("Message sent")
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="mt-20 sm:mt-26">
      <div className=" px-5  mt-5 sm:mt-10 sm:ml-5 ">
        <div className="grid md:grid-cols-2 lg:gap-38 md:gap-23 space-y-8 items-center  ">
          {/* Contact section */}
          <div className=" sm:-mt-40  ">
            <div>
              <h2 className="text-3xl  sm:text-2xl md:text-3xl font-bold text-[#031137] mb-4 md:text-[30px]">
                Contact Us
              </h2>

              <p className="text-gray-600 leading-relaxed text-[16px] sm:mt-4 mt-2.5 md:text-[15px]">
                At Skill Swap, we believe learning becomes more meaningful when
                people share their knowledge with each other. If you have
                questions, need support, or want to share suggestions that can
                help us improve, we’re here to listen. Our team is dedicated to
                making your skill-exchange experience smooth, secure, and
                valuable. Feel free to reach out anytime—we’d love to help you
                grow, learn, and connect with the right people.
              </p>
            </div>

            <div className="sm:ml-35">
              <img
                src="/contact.png"
                alt="contact"
                className=" sm:block  w-60 h-70 md:w-95 md:h-100 rounded-xl"
              />
            </div>
          </div>

          {/* form section */}
          <div className=" w-full max-w-3xl bg-[rgb(225,229,229)] shadow-sm rounded-xl p-6 space-y-6 sm:mt-3 -mt-20">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Contact Here
              </h2>
            </div>

            <form onSubmit={sendEmail} ref={form}>
              <div>
                <div>
                  <label className="block  mb-1.5">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="first_name"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block  mb-1.5 mt-3">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="last_name"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
              </div>

              <div className="">
                <div>
                  <label className="block  mb-1.5  mt-3">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block mb-1.5  mt-3">Contact No.</label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="contact"
                    required
                    ref={phoneRef}
                    // onChange={(e) => {
                    //        e.target.value = e.target.value.replace(/\D/g, "");
                    //     }}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                  {phoneError && ( <p className="text-red-500 font-medium  text-sm mt-1">{phoneError}</p> )}
                </div>
              </div>

              <div>
                <label className="block  mb-1.5 mt-3">Subject</label>
                <input
                  type="text"
                  placeholder="Enter your Subject"
                  name="subject"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                />
              </div>

              <div>
                <label className="block  mb-1.5 mt-3">Message</label>
                <textarea
                  rows="5"
                  placeholder="Enter your Message here..."
                  name="message"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                />
              </div>
              <div className=" text-center mt-2">
                <button
                  type="submit"
                  value="send"
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition w-auto h-auto text-[1em]"
                >
                  Send Your Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

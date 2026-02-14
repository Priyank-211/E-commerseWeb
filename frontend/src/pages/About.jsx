import Title from "../components/Title";
import React from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-112.5" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ipsum
            vel, doloremque fugiat, iste dolores sit assumenda, aliquid dolorem
            et excepturi. Illum, cum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            sequi. Optio corporis distinctio deleniti nobis harum quo doloremque
            necessitatibus praesentium delectus quisquam recusandae aut, sequi
            culpa iste dolorem.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eaque
            sapiente tenetur tempora soluta consequatur illo expedita, corrupti
            et. Maiores fugiat, optio dolores eligendi omnis, voluptatibus
            aliquam qui natus dolorem alias aspernatur at est cum.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4 ">
        <Title text1={"Why"} text2={"Choose us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex=col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            maiores adipisci accusamus reiciendis odit recusandae, officia velit
            voluptates.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex=col gap-5">
          <b>Convenient</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            maiores adipisci accusamus reiciendis odit recusandae, officia velit
            voluptates.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex=col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            maiores adipisci accusamus reiciendis odit recusandae, officia velit
            voluptates.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;

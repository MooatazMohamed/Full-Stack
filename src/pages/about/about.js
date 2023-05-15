import React from "react";
import '../product/style/about.css';
import image from '../../assets/images/aboutImagejfif.jfif';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <section class="about-us">
        <div class="about">
          <img src ={image} alt ="about Image" className="pic"/>
          <div class="text">
            <h2>About Us</h2>
            <h5>
              Front-end Developer & <span>Designer</span>
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
              natus ad sed harum itaque ullam enim quas, veniam accusantium,
              quia animi id eos adipisci iusto molestias asperiores explicabo
              cum vero atque amet corporis! Soluta illum facere consequuntur
              magni. Ullam dolorem repudiandae cumque voluptate consequatur
              consectetur, eos provident necessitatibus reiciendis corrupti!
            </p>
            <div class="data">
              <Link to={'/'} className='backToHome'>Back Home </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;

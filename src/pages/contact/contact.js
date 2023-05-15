import React from "react";
import "../product/style/contact.css";
const Contact = () => {
  return (
    <div className="containerContact">
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>
            <h4 className="topic">Address</h4>
            <div className="text-one">Helwan University</div>
            <div className="text-two">Faculty of Computer Science</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <h4 className="topic">Phone</h4>
            <div className="text-one">+777-888-999</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <h4 className="topic">Email</h4>
            <div className="text-one">HelwanUniversity@gmail.com</div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>
            If you have any work from me or any types of quries related to my
            tutorial, you can send me message from here. It's my pleasure to
            help you.
          </p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <div className="input-box message-box">
              <textarea id="w3review" name="w3review" rows="4" cols="50" className="textArea">
                Enter your message
              </textarea>
            </div>
            <div className="button">
              <input type="button" value="Send Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;

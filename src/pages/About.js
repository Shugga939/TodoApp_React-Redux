import React, { useState } from "react";
import ModalMenu from "../components/ModalMenu/ModalMenu";

function About() {
  let [show, setShow] = useState(false)

  return (
    <div className = 'TODO'>
        <ModalMenu show={show} setShow={setShow}></ModalMenu>
        <div className='about-wrapper'>
          <div className='messageContainer'>
            <div>TODO APP</div>
            <div>Autor: Aleksander Sotnev</div>
            <a href='https://github.com/Shugga939'>GitHub</a>
        </div>
        </div>
    </div>
  );
}

export default About;
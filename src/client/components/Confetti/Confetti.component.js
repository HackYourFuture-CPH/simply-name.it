import React from 'react';
import './Confetti.styles.css';

function Confetti() {
  return (
    <div>
      <img
        className="confetti-animation"
        src="https://img.icons8.com/emoji/208/000000/confetti-ball.png"
        alt="confetti-animation"
      />
      <div class="container">
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
      </div>
    </div>
  );
}

export default Confetti;

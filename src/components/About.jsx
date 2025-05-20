import React from 'react';

export default function About() {
  return (
    <div className="page-container">
      <div className="content-section">
        <h1>About Reservely</h1>
        <div className="about-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>At Reservely, we believe that every business deserves access to powerful reservation tools. 
            We're dedicated to providing affordable, user-friendly reservation solutions for small businesses.</p>
          </section>
          
          <section className="story-section">
            <h2>Our Story</h2>
            <p>Founded in 2025, Reservely emerged from a simple observation: small businesses needed 
            a better, more affordable way to manage their reservations. We've made it our goal to 
            democratize access to reservation technology.</p>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>John Smith</h3>
                <p>Founder & CEO</p>
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>Sarah Johnson</h3>
                <p>Head of Product</p>
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>Mike Chen</h3>
                <p>Lead Developer</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

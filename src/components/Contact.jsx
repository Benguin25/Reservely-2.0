import React from 'react';

export default function Contact() {
  return (
    <div className="page-container">
      <div className="content-section">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions about Reservely? We're here to help!</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <h3>📧 Email</h3>
                <p>support@reservely.com</p>
              </div>
              <div className="contact-method">
                <h3>📞 Phone</h3>
                <p>1-800-RESERVE</p>
              </div>
              <div className="contact-method">
                <h3>🏢 Office</h3>
                <p>123 Business Ave<br />Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <h2>Send us a Message</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

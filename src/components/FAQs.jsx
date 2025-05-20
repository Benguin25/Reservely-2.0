import React from 'react';

export default function FAQs() {
  return (
    <div className="page-container">
      <div className="content-section">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-content">
          <div className="faq-item">
            <h2>What is Reservely?</h2>
            <p>Reservely is an affordable reservation management system designed specifically for small businesses. 
            We provide easy-to-use tools to manage bookings and enhance your customers' experience.</p>
          </div>

          <div className="faq-item">
            <h2>How much does it cost?</h2>
            <p>We offer competitive pricing plans starting at a fraction of what other reservation systems charge. 
            Contact us for detailed pricing information tailored to your business needs.</p>
          </div>

          <div className="faq-item">
            <h2>How do I get started?</h2>
            <p>Getting started is simple! Click the "I am a restaurant owner" button on our homepage, 
            fill in your business details, and you'll have your reservation system up and running in minutes.</p>
          </div>

          <div className="faq-item">
            <h2>Can I customize the booking page?</h2>
            <p>Yes! You can customize the appearance of your booking page to match your brand's colors and style.</p>
          </div>

          <div className="faq-item">
            <h2>What kind of businesses can use Reservely?</h2>
            <p>While we primarily serve restaurants, Reservely can be used by any business that takes appointments 
            or reservations, including salons, spas, and other service-based businesses.</p>
          </div>

          <div className="faq-item">
            <h2>Do I need technical knowledge to use Reservely?</h2>
            <p>Not at all! Our system is designed to be user-friendly and requires no technical expertise. 
            We also provide full support if you need any assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

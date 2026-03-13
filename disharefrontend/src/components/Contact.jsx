import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-section">
          <h2 className="page-title">Contact Us</h2>
          <p className="page-subtitle">We&apos;d love to hear from you.</p>

          <p>
            Have feedback, feature ideas, or ran into an issue while using Dishare? Reach out using the details below
            and our small team will get back to you as soon as we can.
          </p>

          <h3>Email</h3>
          <p>
            <strong>Support:</strong> support@dishare.app
            <br />
            <strong>Partnerships:</strong> partners@dishare.app
          </p>

          <h3>Social</h3>
          <p>
            Follow us for new feature updates, cooking inspiration, and highlighted community recipes:
            <br />
            Instagram: @dishare.app
            <br />
            Twitter: @dishare_app
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;


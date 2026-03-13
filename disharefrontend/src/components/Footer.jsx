import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/terms-of-service" className="footer-link">
            Terms of Service
          </a>
        </div>
        <p className="footer-copy">
          © 2024 Dishare. All rights reserved. | Made with ❤️ for food lovers everywhere
        </p>
      </div>
    </footer>
  );
};

export default Footer;
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
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
          <a href="/help" className="footer-link">
            Help
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
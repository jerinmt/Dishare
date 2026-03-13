import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-section">
          <h2 className="page-title">Terms of Service</h2>
          <p className="page-subtitle">The short, human-readable version of our rules.</p>

          <h3>Using Dishare</h3>
          <p>
            Dishare is a platform for sharing and discovering recipes. By using the app, you agree to share only
            content you have the right to share and to interact respectfully with other members of the community.
          </p>

          <h3>Your content</h3>
          <p>
            You retain ownership of the recipes and photos you upload. By posting them on Dishare, you grant us a
            non-exclusive license to display and promote your content within the app and related marketing materials.
          </p>

          <h3>Fair use and moderation</h3>
          <p>
            We may remove content that is offensive, inappropriate, or clearly not related to cooking. Repeated
            violations may result in account restrictions or removal.
          </p>

          <h3>Changes</h3>
          <p>
            These terms may be updated from time to time as Dishare evolves. When we make material changes, we&apos;ll
            do our best to notify you within the app.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;


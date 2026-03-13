import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-section">
          <h2 className="page-title">About Dishare</h2>
          <p className="page-subtitle">
            A cozy corner of the internet where home cooks share the dishes they love most.
          </p>

          <h3>Our mission</h3>
          <p>
            Dishare was created to make it effortless for anyone to discover, save, and share recipes with friends,
            family, and the wider cooking community. Whether it&apos;s a treasured family classic or a brand-new
            experiment, every recipe has a story.
          </p>

          <h3>What you can do</h3>
          <p>
            Browse through curated collections, explore trending dishes, and follow creators whose cooking style you
            love. Save your favorites, rate recipes you&apos;ve tried, and build your own profile of shared dishes.
          </p>

          <h3>Powered by the community</h3>
          <p>
            Every recipe on Dishare comes from real people in real kitchens. We believe great food is for everyone—and
            that the best recipes are the ones passed from cook to cook.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;


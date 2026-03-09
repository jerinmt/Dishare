import React from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Link } from 'react-router-dom';

function App() {
  return (
      <div className="app">
              <Navbar/>
              <section className="hero">
                <h1 className="hero-title">
                  Discover, Share & Create<br />
                  Amazing Recipes
                </h1>
                <p className="hero-subtitle">
                  Join thousands of home cooks sharing their favorite recipes and culinary creations
                </p>
                <div className="hero-buttons">
                  <Link to="/signup" className="btn-primary">Get Started Free</Link>
                  <a href="#features" className="btn-secondary">Learn More</a>
                </div>
              </section>

              {/* Features Section */}
              <section id="features" className="features">
                <div className="container">
                  <h2 className="section-title">Why Choose Dishare?</h2>
                  <div className="features-grid">
                    <div className="feature-card">
                      <span className="feature-icon">📚</span>
                      <h3 className="feature-title">Recipe Collection</h3>
                      <p className="feature-description">
                        Access thousands of user-submitted recipes from around the world, complete with ingredients, instructions, and cooking tips.
                      </p>
                    </div>

                    <div className="feature-card">
                      <span className="feature-icon">👨‍🍳</span>
                      <h3 className="feature-title">Share Your Creations</h3>
                      <p className="feature-description">
                        Upload your own recipes with photos, detailed instructions, and cooking times. Build your culinary reputation.
                      </p>
                    </div>

                    <div className="feature-card">
                      <span className="feature-icon">🌍</span>
                      <h3 className="feature-title">Global Community</h3>
                      <p className="feature-description">
                        Connect with food enthusiasts worldwide. Follow favorite chefs, comment on recipes, and discover new cuisines.
                      </p>
                    </div>

                    <div className="feature-card">
                      <span className="feature-icon">📱</span>
                      <h3 className="feature-title">Mobile Friendly</h3>
                      <p className="feature-description">
                        Access recipes on any device. Our responsive design ensures a great experience on phones, tablets, and desktops.
                      </p>
                    </div>

                    <div className="feature-card">
                      <span className="feature-icon">⭐</span>
                      <h3 className="feature-title">Rate & Review</h3>
                      <p className="feature-description">
                        Rate recipes, leave reviews, and help others discover the best dishes. Build trust in our community.
                      </p>
                    </div>

                    <div className="feature-card">
                      <span className="feature-icon">🔍</span>
                      <h3 className="feature-title">Smart Search</h3>
                      <p className="feature-description">
                        Find recipes by ingredients, cuisine type, difficulty level, or cooking time. Never struggle to find the perfect dish.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="stats">
                <div className="container">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">10,000+</span>
                      <span className="stat-label">Recipes Shared</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">50,000+</span>
                      <span className="stat-label">Active Users</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">25</span>
                      <span className="stat-label">Countries</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">4.8★</span>
                      <span className="stat-label">Average Rating</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="cta">
                <div className="container">
                  <h2 className="cta-title">Ready to Start Cooking?</h2>
                  <p className="cta-text">
                    Join our community today and discover your next favorite recipe
                  </p>
                  <Link to="/signup" className="btn-primary">Join Dishare Now</Link>
                </div>
              </section>
              <Footer />
            </div>

  );
}

export default App;
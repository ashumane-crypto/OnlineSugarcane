import React from "react";

const Home = () => {
  return (
    <>
      <style>
        {`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Segoe UI", sans-serif;
        }

        /* HERO */
        .hero {
          background: linear-gradient(135deg, #0b7d3b, #0ea44b);
          color: white;
          padding: 80px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
        }

        .hero-text {
          max-width: 600px;
        }

        .hero-text h1 {
          font-size: 48px;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-text p {
          font-size: 18px;
          margin-bottom: 30px;
          line-height: 1.6;
          opacity: 0.95;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-white {
          background: white;
          color: #0b7d3b;
          border: none;
          padding: 12px 22px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 12px 22px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
        }

        .hero-image {
          font-size: 20px;
          opacity: 0.9;
        }

        /* FEATURES */
        .features {
          padding: 60px;
          background: #f7f7f7;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: #e6f6ec;
          color: #0b7d3b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin: 0 auto 15px;
        }

        /* HOW IT WORKS */
        .how {
          padding: 60px;
          text-align: center;
        }

        .how h2 {
          margin-bottom: 40px;
          color: #0b7d3b;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
        }

        .step {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 12px;
        }

        /* VARIETIES */
        .varieties {
          padding: 60px;
          background: #f7f7f7;
          text-align: center;
        }

        .variety-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .variety-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }

        /* STATS */
        .stats {
          padding: 60px;
          background: linear-gradient(135deg, #0b7d3b, #0ea44b);
          color: white;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 30px;
          text-align: center;
        }

        .stat h3 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        /* CTA */
        .cta {
          padding: 60px;
          text-align: center;
        }

        .cta h2 {
          color: #0b7d3b;
          margin-bottom: 20px;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero {
            padding: 40px 20px;
          }

          .hero-text h1 {
            font-size: 34px;
          }

          .features,
          .how,
          .varieties,
          .cta {
            padding: 40px 20px;
          }
        }
      `}
      </style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Premium Sugarcane<br />Seeds & Plants</h1>
          <p>
            Cultivate success with certified, high-yielding sugarcane
            varieties delivered directly to your farm.
          </p>

          <div className="hero-buttons">
            <button className="btn-white">Browse Varieties</button>
            <button className="btn-outline">Order Now</button>
          </div>
        </div>

        <div className="hero-image">🌱 Trusted by Indian Farmers</div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Certified Quality</h3>
          <p>Government certified & tested seeds</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>High Yield</h3>
          <p>Max productivity per acre</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🍃</div>
          <h3>Disease Resistant</h3>
          <p>Stronger & healthier crops</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛒</div>
          <h3>Easy Ordering</h3>
          <p>Simple online booking</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">1️⃣ Choose Variety</div>
          <div className="step">2️⃣ Book Online</div>
          <div className="step">3️⃣ Pay Securely</div>
          <div className="step">4️⃣ Get Delivery</div>
        </div>
      </section>

      {/* VARIETIES */}
      <section className="varieties">
        <h2>Popular Varieties</h2>
        <div className="variety-list">
          <div className="variety-card">CO 86032</div>
          <div className="variety-card">CO 0238</div>
          <div className="variety-card">CoC 671</div>
          <div className="variety-card">Co 94012</div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <h3>10,000+</h3>
          <p>Farmers Served</p>
        </div>
        <div className="stat">
          <h3>50+</h3>
          <p>Varieties</p>
        </div>
        <div className="stat">
          <h3>98%</h3>
          <p>Satisfaction</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Sugarcane Journey Today</h2>
        <button className="btn-white">Book Now</button>
      </section>
    </>
  );
};

export default Home;

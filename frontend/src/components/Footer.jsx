import React from "react";

export default function Footer() {
  return (
    <>
      <style>
        {`
          .footer {
            background: #0b7d3b;
            color: #ffffff;
            padding: 40px 20px 20px;
            margin-top: 60px;
          }

          .footer-container {
            max-width: 1200px;
            margin: auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px;
          }

          .footer h3 {
            margin-bottom: 15px;
            font-size: 18px;
          }

          .footer p,
          .footer a {
            font-size: 14px;
            color: #e6f6ec;
            line-height: 1.6;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          .footer ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer ul li {
            margin-bottom: 8px;
          }

          .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.2);
            margin-top: 30px;
            padding-top: 15px;
            text-align: center;
            font-size: 13px;
            color: #d8f3e3;
          }

          .footer-brand {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .footer-icons {
            display: flex;
            gap: 12px;
            margin-top: 10px;
          }

          .footer-icon {
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
          }

          .footer-icon:hover {
            background: rgba(255,255,255,0.25);
          }

          @media (max-width: 600px) {
            .footer {
              text-align: center;
            }

            .footer-icons {
              justify-content: center;
            }
          }
        `}
      </style>

      <footer className="footer">
        <div className="footer-container">
          
          {/* BRAND */}
          <div>
            <div className="footer-brand">🌱 Sugarcane Booking</div>
            <p>
              Book certified sugarcane seeds & plants easily.  
              Trusted by farmers across India.
            </p>

            <div className="footer-icons">
              <div className="footer-icon">📘</div>
              <div className="footer-icon">📸</div>
              <div className="footer-icon">🐦</div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/varieties">Varieties</a></li>
              <li><a href="/book">Book Order</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Payment Options</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3>Contact Us</h3>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@sugarcanebooking.com</p>
            <p>📍 Maharashtra, India</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} Sugarcane Booking App. All rights reserved.
        </div>
      </footer>
    </>
  );
}


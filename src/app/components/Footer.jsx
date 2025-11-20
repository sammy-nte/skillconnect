import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SkillConnect</h3>
            <p className="text-gray-400 mb-4">
              Connecting you with skilled professionals for all your home
              service needs.
            </p>
            <div className="flex space-x-4">
              <i className="fab fa-facebook text-xl cursor-pointer hover:text-blue-400"></i>
              <i className="fab fa-twitter text-xl cursor-pointer hover:text-blue-400"></i>
              <i className="fab fa-instagram text-xl cursor-pointer hover:text-blue-400"></i>
              <i className="fab fa-linkedin text-xl cursor-pointer hover:text-blue-400"></i>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Electrical
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Carpentry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Cleaning
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2024 SkillConnect. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400">We accept:</span>
            <i className="fab fa-cc-visa text-2xl"></i>
            <i className="fab fa-cc-mastercard text-2xl"></i>
            <i className="fab fa-paypal text-2xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

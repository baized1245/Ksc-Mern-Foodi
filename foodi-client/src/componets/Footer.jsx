import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="section-container rounded-sm shadow-md footer xl:px-24 px-4 py-10 text-base-content bg-slate-300 mt-5">
        <aside>
          <img src="/logo.png" alt="" />
          <p className="my-5 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

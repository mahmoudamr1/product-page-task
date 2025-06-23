// components/Footer.tsx
import React from "react";
import "./Footer.css";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <section id="footer" className="p-5 mt-8 lg:mt-14">
      <div className="footer main-container py-10 px-5 md:px-10 lg:px-16 md:py-14 container w-full flex flex-col gap-6 xl:gap-10 max-w-screen-xl mx-auto">
        <div className="container-footer container">
          <div className="flex  lg:items-center justify-between flex-row flex-wrap lg:flex-row gap-4 lg:gap-10  gap-x-5 gap-y-6 ">
            {/* Logo + Subscribe */}
            <div className="us-footer flex flex-col gap-3 lg:gap-4 order-1 items-start lg:max-w-72 w-full lg:w-auto">
              <div className="flex items-center justify-end space-x-4">
                <a href="#">
                  <Image
                    src="/Logo.png"
                    className=" w-auto main-logo"
                    alt="Website Logo"
                    fill
                  />
                </a>
              </div>
              <div className="email-subscribe flex items-center justify-end">
                <input
                  type="email"
                  placeholder=" Get latest offers to your inbox"
                  className="news-input flex-1"
                />
                <button className="news-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M8 5.05811C8 5.05811 13 8.74052 13 10.0581C13 11.3758 8 15.0581 8 15.0581"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="social-icons lg:flex justify-end items-center gap-2 lg:gap-4 hidden">
                <a
                  href="https://www.youtube.com/channel/UC3fwnZ17PaiokKxVb66QpvA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      d="M4.93799 7.51904V10.519H7.18799V15.769H10.188V10.519H12.438L13.188 7.51904H10.188V6.01904C10.188 5.82013 10.267 5.62937 10.4077 5.48871C10.5483 5.34806 10.7391 5.26904 10.938 5.26904H13.188V2.26904H10.938C9.94343 2.26904 8.9896 2.66413 8.28634 3.36739C7.58308 4.07065 7.18799 5.02448 7.18799 6.01904V7.51904H4.93799Z"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F112442378337132%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.24316 3.76904C5.00052 3.76904 3.99316 4.7764 3.99316 6.01904V12.019C3.99316 13.2617 5.00052 14.269 6.24316 14.269H12.2432C13.4858 14.269 14.4932 13.2617 14.4932 12.019V6.01904C14.4932 4.7764 13.4858 3.76904 12.2432 3.76904H6.24316ZM2.49316 6.01904C2.49316 3.94798 4.1721 2.26904 6.24316 2.26904H12.2432C14.3142 2.26904 15.9932 3.94798 15.9932 6.01904V12.019C15.9932 14.0901 14.3142 15.769 12.2432 15.769H6.24316C4.1721 15.769 2.49316 14.0901 2.49316 12.019V6.01904ZM9.24317 7.51904C8.41474 7.51904 7.74317 8.19062 7.74317 9.01904C7.74317 9.84747 8.41474 10.519 9.24317 10.519C10.0716 10.519 10.7432 9.84747 10.7432 9.01904C10.7432 8.19062 10.0716 7.51904 9.24317 7.51904ZM6.24316 9.01904C6.24316 7.36219 7.58631 6.01904 9.24317 6.01904C10.9 6.01904 12.2432 7.36219 12.2432 9.01904C12.2432 10.6759 10.9 12.019 9.24317 12.019C7.58631 12.019 6.24316 10.6759 6.24316 9.01904ZM13.3682 5.64404C13.3682 5.22983 13.0324 4.89404 12.6182 4.89404C12.204 4.89404 11.8682 5.22983 11.8682 5.64404V5.64479C11.8682 6.05901 12.204 6.39479 12.6182 6.39479C13.0324 6.39479 13.3682 6.05901 13.3682 5.64479V5.64404Z"
                      fill="#121212"
                    />
                  </svg>
                </a>
                <a
                  href="http://facebook.com/www.easyorders.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      d="M16.2271 2.98773C15.4771 3.35523 14.7421 3.50448 13.9771 3.73023C13.1363 2.78148 11.8898 2.72898 10.6921 3.17748C9.4943 3.62598 8.7098 4.72248 8.72705 5.98023V6.73023C6.2933 6.79248 4.1258 5.68398 2.72705 3.73023C2.72705 3.73023 -0.40945 9.30499 5.72705 11.9802C4.32305 12.9155 2.9228 13.5462 1.22705 13.4802C3.70805 14.8325 6.4118 15.2975 8.75255 14.618C11.4376 13.838 13.6441 11.8257 14.4908 8.81148C14.7434 7.89474 14.8688 6.94763 14.8636 5.99674C14.8621 5.80999 15.9961 3.91773 16.2271 2.98698V2.98773Z"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://wa.me/+201030520231"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.28825 4.88464C3.41318 4.64421 3.6645 4.47998 3.95418 4.47998H14.4542C14.7439 4.47998 14.9952 4.64421 15.1201 4.88464L9.20418 8.82859L3.28825 4.88464ZM1.70423 5.21561C1.70408 5.22382 1.70406 5.23203 1.70418 5.24024V12.73C1.70418 13.9726 2.71154 14.98 3.95418 14.98H14.4542C15.6968 14.98 16.7042 13.9726 16.7042 12.73V5.24025M15.2042 6.63137V12.73C15.2042 13.1442 14.8684 13.48 14.4542 13.48H3.95418C3.53997 13.48 3.20418 13.1442 3.20418 12.73V6.63137L8.78816 10.354C9.04008 10.522 9.36828 10.522 9.62021 10.354L15.2042 6.63137ZM16.7041 5.21558C16.6964 3.97957 15.692 2.97998 14.4542 2.97998H3.95418C2.71634 2.97998 1.71196 3.97958 1.70423 5.21561"
                      fill="#121212"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop column */}
            <div className="links-footer flex flex-col items-start justify-center gap-4 order-2">
              <div className="title-links-footer">Shop</div>
              <a href="#" className="link-txt">
                My account
              </a>
              <a href="#" className="link-txt">
                Login
              </a>
              <a href="#" className="link-txt">
                Wishlist
              </a>
              <a href="#" className="link-txt">
                Cart
              </a>
            </div>

            {/* Information column */}
            <div className="links-footer flex flex-col items-start justify-center gap-4 order-3">
              <div className="title-links-footer">Information</div>
              <a href="#" className="link-txt">
                Shipping Policy
              </a>
              <a href="#" className="link-txt">
                Returns & Refunds
              </a>
              <a href="#" className="link-txt">
                Cookies Policy
              </a>
              <a href="#" className="link-txt">
                Frequently asked
              </a>
            </div>

            {/* Company column */}
            <div className="links-footer flex flex-col items-start justify-center gap-4 order-4">
              <div className="title-links-footer">Company</div>
              <a href="#" className="link-txt">
                About us
              </a>
              <a href="#" className="link-txt">
                Privacy Policy
              </a>
              <a href="#" className="link-txt">
                Terms & Conditions
              </a>
              <a href="#" className="link-txt">
                Contact Us
              </a>
            </div>
          </div>

          <div className="all-rights flex items-center justify-center text-center mt-10 lg:mt-16 lg:pt-5 pt-3">
            © John Lewis plc 2001 – 2024
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

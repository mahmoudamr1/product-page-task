"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // لتأثيرات الـ collapse
import "./Header.css";
import Image from "next/image";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBlogOpen, setIsBlogOpen] = useState<boolean>(false); // حالة لقائمة المدونة الفرعية
  const navbarCollapseRef = useRef<HTMLDivElement | null>(null);
  const closeBtnAreaRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const navbarCollapse = navbarCollapseRef.current;
    const closeBtnArea = closeBtnAreaRef.current;

    if (!navbarCollapse || !closeBtnArea) return;

    const outsideClickHandler = (event: MouseEvent) => {
      if (
        isOpen &&
        !navbarCollapse.contains(event.target as Node) &&
        !closeBtnArea.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsBlogOpen(false); // إغلاق القائمة الفرعية عند النقر خارج القائمة
      }
    };

    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [isOpen]);

  const toggleMenu = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleBlogMenu = (): void => {
    setIsBlogOpen((prevState) => !prevState);
  };

  return (
    <div className="main-header flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-screen-xl header1">
        <nav className="w-full sm:w-full">
          <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-4 lg:px-0">
            <div className="relative flex h-16 items-center justify-between gap-2">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between w-full order-2">
                <div className="flex gap-5">
                  <div className="Shopping-cart-logo flex items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.58317 6.66669H16.8298C17.3505 6.66669 17.6108 6.66669 17.8014 6.75072C18.6445 7.12244 18.2676 8.05898 18.1258 8.73202C18.1003 8.85294 18.0173 8.95585 17.9012 9.01102C17.4193 9.23969 17.0817 9.67344 16.9931 10.1779L16.4993 12.9899C16.282 14.2271 16.2078 15.9953 15.1235 16.8669C14.328 17.5 13.1818 17.5 10.8894 17.5H9.11026C6.81786 17.5 5.67167 17.5 4.87617 16.8669C3.79194 15.9952 3.71766 14.2271 3.50039 12.9899L3.00656 10.1779C2.91798 9.67344 2.58045 9.23969 2.09851 9.01102C1.98231 8.95585 1.89944 8.85294 1.87396 8.73202C1.73212 8.05898 1.35517 7.12244 2.19827 6.75072C2.38887 6.66669 2.64919 6.66669 3.16981 6.66669H6.24984"
                        stroke="#141414"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.6668 10H8.3335"
                        stroke="#141414"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.4165 9.16667L8.33317 2.5M12.4998 2.5L14.5832 6.66667"
                        stroke="#141414"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="wish-heart-logo flex items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M16.2187 3.32846C13.9839 1.95769 12.0335 2.51009 10.8618 3.39001C10.3813 3.7508 10.1412 3.93119 9.99984 3.93119C9.8585 3.93119 9.61834 3.7508 9.13784 3.39001C7.96619 2.51009 6.01574 1.95769 3.78104 3.32846C0.848228 5.12745 0.184604 11.0624 6.94944 16.0695C8.23794 17.0232 8.88217 17.5 9.99984 17.5C11.1175 17.5 11.7618 17.0232 13.0503 16.0695C19.8151 11.0624 19.1514 5.12745 16.2187 3.32846Z"
                        stroke="#141414"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className=" items-center justify-center gap-2 hidden md:flex">
                    <span>Sign in</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5.48131 12.9013C4.30234 13.6033 1.21114 15.0367 3.09389 16.8305C4.01359 17.7066 5.03791 18.3333 6.32573 18.3333H13.6743C14.9621 18.3333 15.9864 17.7066 16.9061 16.8305C18.7888 15.0367 15.6977 13.6033 14.5187 12.9013C11.754 11.2551 8.24599 11.2551 5.48131 12.9013Z"
                        stroke="#141414"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.75 5.41669C13.75 7.48775 12.0711 9.16669 10 9.16669C7.92893 9.16669 6.25 7.48775 6.25 5.41669C6.25 3.34562 7.92893 1.66669 10 1.66669C12.0711 1.66669 13.75 3.34562 13.75 5.41669Z"
                        stroke="#141414"
                        strokeWidth="1.25"
                      />
                    </svg>
                  </div>
                  <div
                    className="mobile-navlink items-center justify-between px-3 py-2 cursor-pointer h-full hidden md:flex !p-0"
                    onClick={toggleBlogMenu}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <div
                        className="dropdown-icon flex align-middle justify-center h-max"
                        style={{
                          transform: isBlogOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M15 8C15 8 11.3176 13 10 13C8.68233 13 5 8 5 8"
                            stroke="#141414"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="blog-txt">Categories</span>
                    </div>
                  </div>
                  <div className="search-container flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_57_1326)">
                        <path
                          d="M14.5835 14.5833L18.3335 18.3333"
                          stroke="#141414"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.6665 9.16669C16.6665 5.02455 13.3087 1.66669 9.1665 1.66669C5.02437 1.66669 1.6665 5.02455 1.6665 9.16669C1.6665 13.3089 5.02437 16.6667 9.1665 16.6667C13.3087 16.6667 16.6665 13.3089 16.6665 9.16669Z"
                          stroke="#141414"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_57_1326">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center">
                    <a href="#">
                      <Image
                        src="/Logo.png"
                        className=" w-auto main-logo px-2"
                        alt="Website Logo"
                        fill
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* زر القائمة المنسدلة للهواتف */}
              <div className="relative inset-y-0 left-0 flex items-center sm:hidden order-1">
                <button
                  ref={closeBtnAreaRef}
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-1 focus:outline-hidden focus:ring-inset navbar-toggler"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  onClick={toggleMenu}
                >
                  <span className="relative -inset-1.5" />
                  <svg
                    className={isOpen ? "hidden" : ""}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className={isOpen ? "" : "hidden"}
                    fill="#f44336"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#f44336"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* القائمة المنسدلة على الهواتف */}
          <div
            ref={navbarCollapseRef}
            className={`sm:hidden ${isOpen ? "" : "hidden"}`}
            id="mobile-menu"
          >
            <div className="flex flex-col items-center content-center gap-3 px-2 pt-2 pb-3 navbar-collapse">
              <div className="close-navbar flex px-2 py-2" onClick={toggleMenu}>
                <Image src="/close-nav.png" alt="" fill />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span>Sign in</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5.48131 12.9013C4.30234 13.6033 1.21114 15.0367 3.09389 16.8305C4.01359 17.7066 5.03791 18.3333 6.32573 18.3333H13.6743C14.9621 18.3333 15.9864 17.7066 16.9061 16.8305C18.7888 15.0367 15.6977 13.6033 14.5187 12.9013C11.754 11.2551 8.24599 11.2551 5.48131 12.9013Z"
                    stroke="#141414"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.75 5.41669C13.75 7.48775 12.0711 9.16669 10 9.16669C7.92893 9.16669 6.25 7.48775 6.25 5.41669C6.25 3.34562 7.92893 1.66669 10 1.66669C12.0711 1.66669 13.75 3.34562 13.75 5.41669Z"
                    stroke="#141414"
                    strokeWidth="1.25"
                  />
                </svg>
              </div>
              <div
                className="mobile-navlink flex items-center justify-between  py-2 cursor-pointer !px-0"
                onClick={toggleBlogMenu}
              >
                <div className="items-center gap-1 justify-center flex">
                  <div
                    className="dropdown-icon flex align-middle justify-center h-max"
                    style={{
                      transform: isBlogOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15 8C15 8 11.3176 13 10 13C8.68233 13 5 8 5 8"
                        stroke="#141414"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="blog-txt">Categories</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

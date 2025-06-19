"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // لتأثيرات الـ collapse
import "./Header.css";

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
          <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-6">
            <div className="relative flex h-16 items-center justify-between gap-2">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between w-full order-2">
                <div className="flex space-x-2">
                  <div className="container-start-now-btn">
                    <a
                      href="https://www.easy-orders.net/register/"
                      className="start-now-btn header-link"
                    >
                      اشترك مجاناً الآن
                    </a>
                  </div>

                  <a
                    href="https://app.easy-orders.net/#/login"
                    className="log-in-btn px-3 py-2 header-link hidden md:flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M7.24597 7C7.24597 9.62 9.37597 11.75 11.996 11.75C14.616 11.75 16.746 9.62 16.746 7C16.746 4.38 14.616 2.25 11.996 2.25C9.37597 2.25 7.24597 4.38 7.24597 7ZM8.74597 7C8.74597 5.21 10.206 3.75 11.996 3.75C13.786 3.75 15.246 5.21 15.246 7C15.246 8.79 13.786 10.25 11.996 10.25C10.206 10.25 8.74597 8.79 8.74597 7ZM4.24597 19C4.24597 20.52 5.47597 21.75 6.99597 21.75H16.996C18.516 21.75 19.746 20.52 19.746 19C19.746 15.83 17.166 13.25 13.996 13.25H9.99597C6.82597 13.25 4.24597 15.83 4.24597 19ZM5.74597 19C5.74861 17.8736 6.19723 16.7942 6.99369 15.9977C7.79014 15.2013 8.86961 14.7526 9.99597 14.75H13.996C15.1223 14.7526 16.2018 15.2013 16.9983 15.9977C17.7947 16.7942 18.2433 17.8736 18.246 19C18.246 19.69 17.686 20.25 16.996 20.25H6.99597C6.30597 20.25 5.74597 19.69 5.74597 19Z"
                        fill="black"
                      />
                    </svg>
                    <span> تسجيل الدخول</span>
                  </a>
                </div>
                <div className="flex gap-5">
                  <div className="hidden sm:flex space-x-4 align-middle justify-center ">
                    <div className="relative">
                      <div
                        className="mobile-navlink flex items-center justify-between px-3 py-2 cursor-pointer h-full"
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
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="blog-txt">المدونة</span>
                        </div>
                      </div>
                      <div
                        className={`blog-elm-container absolute bg-white z-50  ${
                          isBlogOpen ? "block" : "hidden"
                        }`}
                      >
                        <AnimatePresence>
                          {isBlogOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col"
                            >
                              <a
                                href="https://www.easy-orders.net/blog/category/%d8%a7%d9%84%d8%aa%d8%ac%d8%a7%d8%b1%d8%a9-%d8%a7%d9%84%d8%a7%d9%84%d9%83%d8%aa%d8%b1%d9%88%d9%86%d9%8a%d8%a9/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                التجارة الالكترونية
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/dropshipping/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                الدروب شيبنج
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/marketing/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                التسويق
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/control-your-store/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                بناء متجرك من الصفر
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/seo/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                تحسين محركات البحث
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/case-studies/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                دراسة حالة
                              </a>
                              <a
                                href="https://www.easy-orders.net/blog/category/%d8%a7%d9%84%d8%b1%d8%a8%d8%ad-%d9%85%d9%86-%d8%a7%d9%84%d8%a5%d9%86%d8%aa%d8%b1%d9%86%d8%aa/"
                                className="mobile-navlink flex items-center gap-2"
                                target="_blank"
                              >
                                الربح من الانترنت
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <a href="#Pricing" className="px-3 py-2 header-link">
                      الأسعار
                    </a>
                    <a
                      href="https://www.easy-orders.net/blog/category/dropshipping-course/"
                      className="px-3 py-2 header-link"
                      target="_blank"
                    >
                      الكورسات
                    </a>
                    <a href="#first-section1" className="px-3 py-2 header-link">
                      الرئيسية
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a href="#">
                      <img
                        src="Logo.png"
                        className=" w-auto main-logo px-2"
                        alt="Website Logo"
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
                <img src="close-nav.png" alt="" />
              </div>
              <a href="#first-section1" className="mobile-navlink">
                الرئيسية
              </a>
              <a
                href="https://www.easy-orders.net/blog/category/dropshipping-course/"
                className="mobile-navlink"
                target="_blank"
              >
                الكورسات
              </a>
              <a href="#Pricing" className="mobile-navlink">
                الأسعار
              </a>

              <div className="w-full">
                <div
                  className="mobile-navlink flex items-center justify-between px-3 py-2 cursor-pointer"
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="mobile-navlink !p-0">المدونة</span>
                  </div>
                </div>

                <AnimatePresence>
                  {isBlogOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col"
                    >
                      <a
                        href="https://www.easy-orders.net/blog/category/%d8%a7%d9%84%d8%aa%d8%ac%d8%a7%d8%b1%d8%a9-%d8%a7%d9%84%d8%a7%d9%84%d9%83%d8%aa%d8%b1%d9%88%d9%86%d9%8a%d8%a9/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        التجارة الالكترونية
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/dropshipping/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        الدروب شيبنج
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/marketing/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        التسويق
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/control-your-store/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        بناء متجرك من الصفر
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/seo/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        تحسين محركات البحث
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/case-studies/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        دراسة حالة
                      </a>
                      <a
                        href="https://www.easy-orders.net/blog/category/%d8%a7%d9%84%d8%b1%d8%a8%d8%ad-%d9%85%d9%86-%d8%a7%d9%84%d8%a5%d9%86%d8%aa%d8%b1%d9%86%d8%aa/"
                        className="mobile-navlink flex items-center gap-2"
                        target="_blank"
                      >
                        الربح من الانترنت
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="https://app.easy-orders.net/#/login"
                className="mobile-navlink mobile-log-in-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clip-rule="evenodd"
                    d="M7.24597 7C7.24597 9.62 9.37597 11.75 11.996 11.75C14.616 11.75 16.746 9.62 16.746 7C16.746 4.38 14.616 2.25 11.996 2.25C9.37597 2.25 7.24597 4.38 7.24597 7ZM8.74597 7C8.74597 5.21 10.206 3.75 11.996 3.75C13.786 3.75 15.246 5.21 15.246 7C15.246 8.79 13.786 10.25 11.996 10.25C10.206 10.25 8.74597 8.79 8.74597 7ZM4.24597 19C4.24597 20.52 5.47597 21.75 6.99597 21.75H16.996C18.516 21.75 19.746 20.52 19.746 19C19.746 15.83 17.166 13.25 13.996 13.25H9.99597C6.82597 13.25 4.24597 15.83 4.24597 19ZM5.74597 19C5.74861 17.8736 6.19723 16.7942 6.99369 15.9977C7.79014 15.2013 8.86961 14.7526 9.99597 14.75H13.996C15.1223 14.7526 16.2018 15.2013 16.9983 15.9977C17.7947 16.7942 18.2433 17.8736 18.246 19C18.246 19.69 17.686 20.25 16.996 20.25H6.99597C6.30597 20.25 5.74597 19.69 5.74597 19Z"
                    fill="black"
                  />
                </svg>
                <span> تسجيل الدخول</span>
              </a>
              <div className="container-start-now-btn mobile-container-start-now-btn">
                <a
                  href="https://www.easy-orders.net/register/"
                  className="start-now-btn header-link"
                >
                  اشترك مجاناً الآن
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

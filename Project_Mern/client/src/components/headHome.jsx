import React from 'react';
import { motion } from 'framer-motion';

function HeadHome() {
  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };

  return (
    <motion.div
      className="relative bg-white pt-[120px] pb-[110px] lg:pt-[150px]"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-5/12">
            <div className="hero-content">
              <h1
                className="mb-3 text-4xl font-bold leading-snug text-dark sm:text-[42px] lg:text-[40px] xl:text-[42px]"
              >
                Home Care <br />
                Easiest Way <br />
                To Find or Offer Services
              </h1>
              <p className="mb-8 max-w-[480px] text-base text-body-color">
                We've made the process effortless. Whether you're searching for the right service or
                looking to offer your expertise, our platform streamlines it all.
                With a few clicks, you can quickly discover a wide range of services or connect with those in need.
                Simplify your life with us, where convenience and accessibility meet.
              </p>
              <button className=' inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                style={{ backgroundColor: 'blue' }}>
                About Us
              </button>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative  inline-block pt-11 lg:pt-0">
                <img
                  src="HomeServices.jpeg"
                  alt="hero"
                  className="max-w-full lg:ml-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <span className="absolute -left-8 -bottom-8 z-[-1]">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="item"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                      variants={icon}
                      transition={{
                        default: { duration: 1, ease: "easeInOut" },
                        fill: { duration: 1, ease: [1, 0, 0.8, 1] }
                      }}
                    />
                  </motion.svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeadHome;
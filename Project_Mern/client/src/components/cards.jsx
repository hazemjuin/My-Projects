import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 2, // Set the duration to 0.5 seconds
    },
  },
};

function Cards() {

  const scrollToTop = () => { // Scroll to the top of the page
    window.scrollTo(0, 0); 
  };

  const [ref1, inView1] = useInView({
    triggerOnce: false,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: false,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: false,
  });

  const [ref4, inView4] = useInView({
    triggerOnce: false,
  });

  const [ref5, inView5] = useInView({
    triggerOnce: false,
  });

  const [ref6, inView6] = useInView({
    triggerOnce: false,
  });

  return (
    <>
      {/* ====== Cards Section Start */}
      <section
        className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20"
        style={{ marginTop: "120px" }}
      >
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            {/* Card 1 */}
            <motion.div
              ref={ref1}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
            >
              <div className="mb-8 overflow-hidden rounded-lg bg-white">
                <img
                  src="babysitter.jpg"
                  alt="BabySitting"
                  className="w-full"
                  style={{ height: "425px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                      onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      BabySitting
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  Keeps children's living and play areas tidy. Helps with homework and tutoring as needed. Cares for infants, including feeding, diapering, and dressing.
                  Meets the physical, social, and emotional needs of children in their care.
                  </p>
                  <Link
                    onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              ref={ref2}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
            >
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
                <img
                  src="housemoving.jpg"
                  alt="Moving House"
                  className="w-full"
                  style={{ height: "425px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                    onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      Moving House
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  Movers are responsible for the entire moving process for residential and commercial clients. 
                  Their primary job is to disassemble, load, organize, and brace light and heavy items into a moving truck for safe transport.
                  
                  </p>
                  <Link
                  onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              ref={ref3}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
            >
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
                <img
                  src="household.png"
                  alt="Household"
                  className="w-full"
                  style={{ height: "425px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                    onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      Household
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  Housekeepers are responsible for cleaning and reporting any safety hazards to the homeowner or manager in charge. They must complete tasks like vacuuming, sweeping, cleaning windows, and mopping floors.
                  
                  </p>
                  <Link
                  onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              ref={ref4}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView4 ? "visible" : "hidden"}
            >
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
                <img
                  src="petcare.jpg"
                  alt="Pet Care"
                  className="w-full h-50"
                  style={{ height: "425px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                    onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      Pet Care
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  Animal Care Attendants are responsible for the day-to-day care of medical boarding and Stay-the-Day pets.
                  This includes feeding, watering, cleaning, walking, bathing, medicating and monitoring the well-being of dogs, cats and occasionally other companion animals.
                  </p>
                  <Link
                  onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              ref={ref5}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView5 ? "visible" : "hidden"}
            >
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
                <img
                  src="DIY.jpg"
                  alt="DIY"
                  className="w-full h-50"
                  style={{ height: "425px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                    onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >                      
                    Miscellaneous
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  The miscellaneous sector encompasses a wide variety of job types and includes duties that are outside the standard categories.
                  The diverse nature of this sector means that it offers employment opportunities for individuals with varying skill sets and qualifications.
                  </p>
                  <Link
                  onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              ref={ref6}
              className="w-full px-4 md:w-1/2 xl:w-1/3"
              variants={item}
              initial="hidden"
              animate={inView6 ? "visible" : "hidden"}
            >
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
                <img
                  src="plumber.jpg"
                  alt="Plumber"
                  className="w-full"
                  style={{ height: "450px" }}
                />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                    <Link
                    onClick={scrollToTop}
                      to="/allServices"
                      className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm.text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      Plumber
                    </Link>
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color">
                  Plumbers install and repair pipes and fixtures that carry water, gas, or other fluids in homes and businesses.
                  They also maintain plumbing fixtures like bathtubs and toilets and appliances such as dishwashers or heating systems.
                  </p>
                  <Link
                  onClick={scrollToTop}
                    to="/allServices"
                    style={{ backgroundColor: "#a8df8e" }}
                    className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover.border-primary hover.bg-primary hover.text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ====== Cards Section End */}
    </>
  );
}

export default Cards;
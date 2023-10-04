import React from "react";

function Services() {
  return (
    <>
      {/* ====== Services Section Start */}
      <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Services
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  What We Offer
                </h2>
                <p className="text-base text-body-color">
                "At HOME CARE, we take pride in simplifying your life by offering a wide array of essential home services. 
                Our platform connects you with trusted professionals who are dedicated to providing top-notch services. 
                Explore the convenience of finding all your home service needs in one place and experience peace of mind knowing your home is in capable hands."
                </p>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10">
                <div className="mb-8 flex items-center justify-center rounded-2xl bg-primary">
                  <img
                    src="servicesicone.jpg"
                    alt="image"
                    className="w-full"
                    style={{ width: "200px", height: "100px" }}
                  />
                </div>
                <h4 className="mb-3 text-xl font-semibold text-dark">
                  Refreshing Design
                </h4>
                <p className="text-body-color">
                "Immerse yourself in the beauty of our Refreshing Design. Our carefully crafted visuals are a breath of fresh air, blending creativity and elegance seamlessly. 
                Explore a world of aesthetics that rejuvenate your senses and inspire creativity. Welcome to a new dimension of design."
                </p>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10">
                <div className="mb-8 flex  items-center justify-center rounded-2xl bg-primary">
                  <img
                    src="timeicone.png"
                    alt="image"
                    className="w-full"
                    style={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "15px",
                    }}
                  />
                </div>
                <h4 className="mb-3 text-xl font-semibold text-dark">
                  Creative Ideas
                </h4>
                <p className="text-body-color">
                "Dive into the boundless realm of 'Creative Ideas' captured in a single frame. 
                It's a visual portal to a world where inspiration knows no bounds. Explore, dream, and let your creativity soar as you gaze upon this captivating snapshot of innovation."


                </p>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10">
                <div className="mb-8 flex  items-center justify-center rounded-2xl bg-primary">
                  <img
                    src="easytouse.jpg"
                    alt="image"
                    className="w-full"
                    style={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "15px",
                    }}
                  />
                </div>
                <h4 className="mb-3 text-xl font-semibold text-dark">
                  Effective Solutions
                </h4>
                <p className="text-body-color">
                "Discovering the services you need has never been easier. 
                Our streamlined solution is designed to make your search for services quick, convenient, and hassle-free. 
                With user-friendly navigation and powerful search tools at your fingertips, you can effortlessly find the perfect services to meet your needs."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Services Section End */}
    </>
  );
}

export default Services;
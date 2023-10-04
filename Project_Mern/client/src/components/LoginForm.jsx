import React from "react";

function LoginForm({ user, setter, operation, errors }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Form | TailGrids</title>
        <link
          rel="shortcut icon"
          href="assets/images/favicon.svg"
          type="image/x-icon"
        />
        <link rel="stylesheet" href="assets/css/tailwind.css" />
      </head>
      <body>
        {/* Forms Section Start */}
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                  <div className="mb-10 text-center md:mb-16">
                    <a
                      href="javascript:void(0)"
                      className="mx-auto inline-block max-w-[160px]"
                    >
                      <img src="LOGO.png" alt="logo" />
                    </a>
                  </div>
                  <form onSubmit={(e) => operation(e, user)}>
                    <div className="mb-6">
                      <input
                        type="text"
                        placeholder="Email"
                        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                        onChange={(e) =>
                          setter({ ...user, email: e.target.value })
                        }
                        value={user.email}
                      />
                      {errors.email && (
                        <span className="text-danger h5">
                          {" "}
                          {errors.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        placeholder="Password"
                        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                        onChange={(e) =>
                          setter({ ...user, password: e.target.value })
                        }
                        value={user.password}
                      />

                      {errors.password && (
                        <span className="text-danger h5">
                          {" "}
                          {errors.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-10">
                      <input
                        type="submit"
                        value="Sign In"
                        className="border-primary w-full cursor-pointer rounded-md border bg-Primary  py-3 px-5 text-base text-dark transition hover:bg-opacity-90"
                      ></input>
                    </div>
                  </form>

                  <p className="text-base text-[#adadad]">
                    Not a member yet?
                    <a
                      href="javascript:void(0)"
                      className="text-primary hover:underline"
                    >
                      Sign Up
                    </a>
                  </p>

                  <div>
                    <span className="absolute top-1 right-1">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="1.39737"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 1.39737 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 1.39737 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 13.6943 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 13.6943 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 25.9911 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 25.9911 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.2880"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 38.2880 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.2880"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 38.2880 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 1.39737 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 13.6943 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 25.9911 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.2880"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 38.2880 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 1.39737 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 13.6943 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 25.9911 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.2880"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 38.2880 14.0086)"
                          fill="#3056D3"
                        />
                      </svg>
                    </span>
                    <span className="absolute left-1 bottom-1">
                      <svg
                        width="29"
                        height="40"
                        viewBox="0 0 29 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2.288"
                          cy="25.9912"
                          r="1.39737"
                          transform="rotate(-90 2.288 25.9912)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="25.9911"
                          r="1.39737"
                          transform="rotate(-90 14.5849 25.9911)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="25.9911"
                          r="1.39737"
                          transform="rotate(-90 26.7216 25.9911)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="13.6944"
                          r="1.39737"
                          transform="rotate(-90 2.288 13.6944)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="13.6943"
                          r="1.39737"
                          transform="rotate(-90 14.5849 13.6943)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="13.6943"
                          r="1.39737"
                          transform="rotate(-90 26.7216 13.6943)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="38.0087"
                          r="1.39737"
                          transform="rotate(-90 2.288 38.0087)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="1.39739"
                          r="1.39737"
                          transform="rotate(-90 2.288 1.39739)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="38.0089"
                          r="1.39737"
                          transform="rotate(-90 14.5849 38.0089)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="38.0089"
                          r="1.39737"
                          transform="rotate(-90 26.7216 38.0089)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="1.39761"
                          r="1.39737"
                          transform="rotate(-90 14.5849 1.39761)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="1.39761"
                          r="1.39737"
                          transform="rotate(-90 26.7216 1.39761)"
                          fill="#3056D3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}

export default LoginForm;

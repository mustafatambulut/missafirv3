import { get } from "lodash";

const Hero = ({ data }: object) => {
  return (
    // <div
    //   className="hero min-h-screen"
    //   style={{
    //     backgroundImage: `url(${process.env.API_URL_DEV}${get(
    //       data,
    //       "image.data.attributes.url"
    //     )})`
    //   }}>
    //   <div className="hero-overlay bg-opacity-40"></div>
    //   <div className="hero-content text-center text-neutral-content">
    //     <div className="">
    //       <h1 className="mb-5 text-5xl font-bold">{get(data, "title")}</h1>
    //     </div>
    //   </div>
    // </div>
      <div className="hero min-h-screen bg-[url(/images/hero-image.png)] ">
          <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
              </div>
          </div>
      </div>
  );
};

export default Hero;

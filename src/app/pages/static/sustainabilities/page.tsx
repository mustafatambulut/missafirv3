import BodyHeartIcon from "/public/images/contact_heart.svg";
import HeaderImage from "/public/images/contact_header.svg";
import { capitalize, get, map, slice, upperCase, words } from "lodash";

import Image from "next/image";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import Marquee from "@/components/atoms/marquee/Marquee";

const Sustainability = ({ data }: any) => {
  // const [sustainabilityData, setSustainabilityData] = useState<any>(null);
  // const [sliders, setSliders] = useState<any>([] as any);
  // const [body, setBody] = useState<any>(null);
  // const [footer, setFooter] = useState<any>(null);
  // const [header, setHeader] = useState<any>(null);
  // const [tabTitles, setTabTitles] = useState<any>(null);

  // const fetchData = async (context: any) => {
  //   const { attributes } = await getPage(context);
  //   !isNull(attributes) && setSustainabilityData(attributes);
  // };

  // useEffect(() => {
  //   isEmpty(sustainabilityData) && fetchData(SUSTAINABILITY);
  // }, []);

  // useEffect(() => {
  //   if (!sustainabilityData) return;

  //   const contents: any = map(get(sustainabilityData, "body"));

  //   setSliders(contents[1]);
  //   setBody(contents[2]);
  //   setFooter(get(sustainabilityData, "footer"));
  //   setHeader(get(sustainabilityData, "header"));
  // }, [sustainabilityData]);
  data = data.attributes;

  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-16 lg:mt-40 relative">
        <div className="py-10">
          {/* Title and slider zone */}
          <div className="hidden lg:block absolute top-0 right-0 z-10">
            <HeaderImage />
          </div>
          <div className="text-center mb-10 px-4 lg:px-8">
            <h1 className="text-primary font-mi-sans-semi-bold text-42">
              {capitalize(words(data?.header?.title)[0])}{" "}
              <span className="text-gray-800">
                {capitalize(words(data?.header?.title)[1])}{" "}
              </span>
              <span className="text-gray-800">
                {capitalize(words(data?.header?.title)[2])}
              </span>
            </h1>
            <p className="text-gray-600 pt-4 text-21 mx-4">
              {slice(words(data?.header?.description), 0, 13)?.join(" ")}{" "}
              <br className="hidden lg:block" />
              <span>
                {slice(words(data?.header?.description), 13)?.join(" ")}
              </span>
            </p>
          </div>
          <div className="w-screen relative">
            {
              get(data, "body.sliders") &&
                get(data, "body.sliders.data").length && (
                  <Marquee
                    items={map(
                      get(data, "body.sliders.data"),
                      (slider) => slider.attributes.image
                    )}
                    className="p-2"
                    direction="left"
                    marqueeItemClassName="rounded-xl shadow-[0px_2px_10px_0px_#00000014] relative w-64 lg:w-80 h-44 lg:h-56 p-2 mx-2"
                    marqueeItemInnerClassName="w-full h-full"
                    marqueeImageClassName="object-cover rounded-xl"
                  />
                )
              /*map(get(data, "body.sliders.data"), (i: any, index: any) => (
                <div
                  key={index}
                  className="w-64 h-60 bg-white shadow-md rounded-xl p-3 flex justify-center mx-2">
                  <Image
                    src={i?.attributes?.image || "/"}
                    alt={i?.attributes?.description || "/"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={i?.attributes?.image}
                    className="rounded-xl"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))*/
            }
            <div className="hidden lg:block absolute bottom-[-10rem] left-0 z-10">
              <BodyHeartIcon />
            </div>
          </div>
          {/* Title and Slider Zone End */}
          {/* Spacer */}

          {/* Body Header Zone */}
          <div className="container mx-auto p-4 text-center mt-16 lg:mt-32">
            <h3 className="text-md text-gray-500">
              {get(data, "body.bodyTitle.title")}
            </h3>
            <div>
              <h4 className="font-mi-sans-semi-bold text-32 text-gray">
                {get(data, "body.bodyTitle.subTitle")}
              </h4>
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {get(data, "body.bodyTitle.description")}
              </p>
            </div>
          </div>
          {/* Body Header Zone End */}
        </div>
      </div>

      <PremiumStatic
        title={data?.footer?.bannerHeader.title}
        description={data?.footer?.bannerBody.description}
        buttonLabel={data?.footer?.bannerFooter.label}
        image={data?.footer?.bannerBody.image}
      />
    </>
  );
};

export default Sustainability;

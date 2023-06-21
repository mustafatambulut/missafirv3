import { find, flattenDepth, get, map, omit, values } from "lodash";

import { getPage } from "@/service";

import Hero from "@/components/molecules/hero";
import Slider from "@/components/molecules/slider";

const Body = async () => {
  //todo: devam edecek

  // const { attributes } = await getHomeData();
  // const data = find(get(attributes, "home"), {
  //   __component: "body.body"
  // });

  const { attributes } = await getPage();
  const data = find(get(attributes, "home"), {
    __component: "body.body"
  });

  // console.log("----------------------");
  // console.log(attributes);
  // console.log("----------------------");

  const components = flattenDepth(values(omit(data, ["id", "__component"])));

  // const test = [];
  // components.map((component) => (
  // test.push(dynamic(() => import(`../../molecules/${}`), {
  //   ssr: false,
  // }))
  // ));
  // const CodeSampleModal = dynamic(() => import(`../../molecules/${}`), {
  //   ssr: false,
  // });
  // const CodeSampleModal = dynamic(() => import("../../molecules/hero/index"), {
  //   ssr: true
  // });

  return (<div>aşflw</div>);

  return (
    <div>
      {map(components, (component, key) => (
        <div key={key}>
          {get(component, "type") === "hero" ? (
            <Hero data={component} />
          ) : get(component, "type") === "slider" ? (
            <Slider data={component} />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};
export default Body;

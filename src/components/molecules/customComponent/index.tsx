import dynamic from "next/dynamic";

const CustomComponent = ({ data }: object) => {
  const SelectedComponent = dynamic(() => import(`../${data.type}/index`));

  // const SelectedComponent = dynamic(() => import(`../${data.type}/index`));

  return (
    <div>
      <SelectedComponent data={data} />
    </div>
  );
};

export default CustomComponent;

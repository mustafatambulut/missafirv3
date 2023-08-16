"use client";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Section from "@/components/molecules/section/Section";

import RightArrow from "../../../../public/images/chevron_right.svg";

const News = () => {
  //todo: api entregrasyonu yapılınca kaldırılacak
  const mockNews = {
    header: {
      title: "Explore travel trends and property news",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
    },
    body: [
      {
        image:
          "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg",
        date: "06.07.2023",
        title: "Outstanding Flat with Calming View at Nisantasi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
        tags: ["lorem", "ipsum", "dolor"]
      },
      {
        image:
          "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg",
        date: "06.07.2023",
        title: "Outstanding Flat with Calming View at Nisantasi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
        tags: ["lorem", "ipsum", "dolor"]
      },
      {
        image:
          "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg",
        date: "06.07.2023",
        title: "Outstanding Flat with Calming View at Nisantasi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
        tags: ["lorem", "ipsum", "dolor"]
      },
      {
        image:
          "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg",
        date: "06.07.2023",
        title: "Outstanding Flat with Calming View at Nisantasi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
        tags: ["lorem", "ipsum", "dolor"]
      }
    ]
  };

  const PropertyCardComponent = ({ property }: any) => (
    <Card className="mb-10 lg:mb-0">
      <div className="shadow-[0px_1px_20px_0px_#00000014] rounded-2xl">
        <div className="w-full h-60 relative">
          <Link href="/">
            <Image
              src={get(property, "image") || ""}
              alt="image"
              fill={true}
              className="rounded-t-2xl object-cover"
            />
          </Link>
        </div>
        <div className="px-3 py-4">
          <div className="text-base text-gray-500">{get(property, "date")}</div>
          <div className="text-2xl font-mi-sans-semi-bold text-gray-900 my-2">
            {get(property, "title")}
          </div>
          <div className="text-lg text-gray-500">
            {get(property, "description")}
          </div>
          <div className="flex gap-x-5 mt-4">
            {map(get(property, "tags"), (tag, key) => (
              <Link href="/" key={key} className="text-primary">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  const FooterComponent = () => (
    <div className="text-center">
      <Button
        variant="btn-primary"
        link="/"
        className="mt-10 bg-primary-50 text-primary border-primary-25 hover:bg-primary hover:border-primary group">
        <span className="group-hover:text-white text-xl font-mi-sans-semi-bold">
          See All Blogs
        </span>
        <RightArrow className="scale-50 fill-primary group-hover:fill-white" />
      </Button>
    </div>
  );

  return (
    <Loading isLoading={!mockNews} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <Section
        className="px-4 lg:px-8 mt-14"
        title={get(mockNews, "header.title")}
        description={get(mockNews, "header.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-5">
          {map(get(mockNews, "body"), (property, key) => (
            <PropertyCardComponent key={key} property={property} />
          ))}
        </div>
      </Section>
      <FooterComponent />
    </Loading>
  );
};

export default News;

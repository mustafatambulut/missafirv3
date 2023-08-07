"use client";
import React from "react";
import { get, map } from "lodash";
import Image from "next/image";
import Card from "@/components/atoms/card/Card";
import Link from "next/link";
import Button from "@/components/atoms/button/Button";

import RightArrow from "../../../../public/images/chevron_right.svg";
import Section from "@/components/molecules/section/Section";

const News = () => {
  const news = {
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
  return (
    <>
      {news && (
        <Section
          className="px-4 lg:px-8 mt-14"
          title={get(news, "header.title")}
          description={get(news, "header.description")}>
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-5">
            {map(get(news, "body"), (newItem, key) => (
              <Card key={key} className="mb-10 lg:mb-0">
                <div className="shadow-[0px_1px_20px_0px_#00000014] rounded-2xl">
                  <div className="w-full h-60 relative">
                    <Link href="/">
                      <Image
                        src={get(newItem, "image") || ""}
                        alt="image"
                        fill={true}
                        className="rounded-t-2xl object-cover"
                      />
                    </Link>
                  </div>
                  <div className="px-3 py-4">
                    <div className="text-base text-gray-500">
                      {get(newItem, "date")}
                    </div>
                    <div className="text-2xl font-mi-sans-semi-bold text-gray-900 my-2">
                      {get(newItem, "title")}
                    </div>
                    <div className="text-lg text-gray-500">
                      {get(newItem, "description")}
                    </div>
                    <div className="flex gap-x-5 mt-4">
                      {map(get(newItem, "tags"), (tag, key) => (
                        <Link href="/" key={key} className="text-primary">
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
        </Section>
      )}
    </>
  );
};

export default News;

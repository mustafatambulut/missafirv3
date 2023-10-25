import Link from "next/link";
import { get, map } from "lodash";
import { getTranslator } from "next-intl/server";

import { INews } from "@/components/molecules/news/types";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import Section from "@/components/molecules/section/Section";
import PropertyCard from "@/components/molecules/propertyCard/PropertyCard";
import NewsSkeleton from "@/components/molecules/skeletons/newsSkeleton/NewsSkeleton";

import RightArrow from "../../../../public/images/chevron_right.svg";

const News = async ({ lang }: INews) => {
  const t = await getTranslator(lang);

  //todo: api entregrasyonu yapılınca kaldırılacak
  const mockNews = {
    header: {
      title: t("landing_news_title"),
      description: t("landing_news_subtitle")
    },
    body: [
      {
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/missafir_blogairbnbfethiye_44bd7a6789.png",
        date: "06.07.2023",
        title: t("blog_fethiye_title"),
        description: t("blog_fethiye_subtitle"),
        tags: ["#airbnb", "#" + t("accommodation") + ""],
        link: "https://www.missafir.com/airbnb-fethiye/"
      },
      {
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/expat_istanbul_1395198d96.png",
        date: "01.05.2023",
        title: t("blog_expat_title"),
        description: t("blog_expat_subtitle"),
        tags: ["#" + t("RealEstate") + ""],
        link: "https://www.missafir.com/expat-istanbul/"
      },
      {
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/Ekran_goeruentuesue_2023_09_30_181131_bd5f17606e.png",
        date: "06.07.2023",
        title: t("blog_ada_title"),
        description: t("blog_ada_subtitle"),
        tags: ["#" + t("accommodation") + ""],
        link: "https://www.missafir.com/bozcaada-plajlari/"
      },
      {
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/Ekran_goeruentuesue_2023_09_30_181421_190c906cb7.png",
        date: "06.07.2023",
        title: t("blog_ist_title"),
        description: t("blog_ist_subtitle"),
        tags: ["#" + t("accommodation") + ""],
        link: "https://www.missafir.com/istanbul-konaklama-rehberi/"
      }
    ]
  };

  const FooterComponent = () => (
    <div className="flex justify-center">
      <Button
        variant="btn-primary"
        target="_blank"
        link="https://missafir.com/blog"
        className="mt-10 bg-primary-50 text-primary border-primary-25 hover:bg-primary hover:border-primary group">
        <Typography element="h6" variant="h6" className="flex items-center">
          <span className="group-hover:text-white">{t("go_to_the_blog")}</span>
          <RightArrow className="scale-50 fill-primary group-hover:fill-white" />
        </Typography>
      </Button>
    </div>
  );

  return (
    <Loading isLoading={!mockNews} loader={<NewsSkeleton />}>
      <Section
        className="px-2 lg:px-8 mt-14"
        title={get(mockNews, "header.title")}
        description={get(mockNews, "header.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-5">
          {map(get(mockNews, "body"), (property, key) => (
            <Link key={key} href={get(property, "link")} target="_blank">
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
        <FooterComponent />
      </Section>
    </Loading>
  );
};

export default News;

import { getPageLocal } from "../../../service/api";
import WhoWeAre from "@/app/pages/static/who-we-are/page";
import Faq from "@/app/pages/static/faq/page";
import OwnerLayout from "@/app/pages/owner/layout";
import OwnerPage from "@/app/pages/owner/page";
import InviteAndEarn from "@/app/pages/static/invite-and-earn/page";
import Sustainability from "@/app/pages/static/sustainabilities/page";
import LifAtMissafir from "@/app/pages/static/life-at-missafir/page";
import ContactLayout from "@/app/pages/contact/layout";
import ContactPage from "@/app/pages/contact/page";
import OurPackages from "@/app/pages/static/our-packages/page";

const StaticPage = async ({
  targetPageVariable,
  lang
}: {
  targetPageVariable: any;
  lang: any;
}) => {
  return getTemplate(targetPageVariable, lang);

  async function getTemplate(targetPageVariable: any, lang: any) {
    // console.log("helloo: <" + targetPageVariable + ">");
    switch (targetPageVariable) {
      case "about-us": {
        const pageData = await getPageLocal(targetPageVariable, lang);
        return <WhoWeAre data={pageData} />;
      }
      case "faq": {
        const pageData = await getPageLocal(targetPageVariable, lang);
        return <Faq data={pageData} />;
      }
      case "alive-with-missafir": {
        const pageData = await getPageLocal(targetPageVariable, lang);
        return <LifAtMissafir data={pageData} />;
      }
      case "referral-program": {
        const pageData = await getPageLocal(targetPageVariable, lang);
        return <InviteAndEarn data={pageData} />;
      }
      case "sustainability": {
        const pageData = await getPageLocal(targetPageVariable, lang);
        return <Sustainability data={pageData} />;
      }
      case "our-packages":
        return <OurPackages />;
      case "get-an-offer":
        return (
          <OwnerLayout>
            <OwnerPage />
          </OwnerLayout>
        );
      case "contact":
        return (
          <ContactLayout>
            <ContactPage />
          </ContactLayout>
        );
      default:
        // 404
        break;
    }
  }
};

export default StaticPage;

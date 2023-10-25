import { getPageLocal } from "../../../service/api";
import WhoWeAre from "@/app/pages/static/who-we-are/page";
import Faq from "@/app/pages/static/faq/page";
import Owner from "@/app/pages/owner/page";
import InviteAndEarn from "@/app/pages/static/invite-and-earn/page";
import Sustainability from "@/app/pages/static/sustainabilities/page";
import LifAtMissafir from "@/app/pages/static/life-at-missafir/page";
import Contact from "@/app/pages/contact/page";

const TextPage = async ({
  pageId, lang
}: {
  pageId: any;
  lang: any;
}) => {


  return 'Lorem ipsum pagee . ' + pageId
};

export default TextPage;

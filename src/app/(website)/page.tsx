import AboutUs from "@/features/Home/aboutUs/Component/AboutUs";
import Banner from "@/features/Home/banner/component/Banner";
import BrowseInstruments from "@/features/Home/browseInstruments/component/BrowseInstruments";
import ExploreCategories from "@/features/Home/exploreCategories/component/ExploreCategories";
import HowItWorks from "@/features/Home/howItWorks/component/HowItWorks";
import Review from "@/features/Home/review/component/Review";

export default function page() {
  return (
    <main className="relative bg-white pb-20 ">
      <Banner />
      <BrowseInstruments />
      <ExploreCategories />
      <AboutUs />
      <HowItWorks />
      <Review />
    </main>
  );
}

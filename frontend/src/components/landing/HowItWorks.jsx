import HowToWorkCard from "./components/HowToWorkCard";
import SearchSneakersBtn from "./components/SearchSneakersBtn";

const HowItWorks = () => {
  return (
    <section className="my-container top-bottom-margin mt-24 md:mt-28 xl:mt-40 flex flex-col items-center gap-8 md:gap-10 xl:gap-12">
      <div className="flex flex-col items-center gap-7 md:gap-[60px]">
        <h1
          className="text-title-work-card font-staatliches text-3xl md:text-[30px] md:leading-[30px] md:tracking-[0.52px] 
        xl:text-[45px] xl:leading-[50px]"
        >
          How It Works
        </h1>
        <div className="flex flex-col items-start gap-6 sm:flex-row xl:relative xl:gap-[120px] xl:w-full xl:justify-between">
          <HowToWorkCard
            img={"/images/landing/howItWorks/leftIcon.svg"}
            title={"Locate your sneakers"}
            desc={
              'Explore our vast collection of 80k sneakers from "Sneakers Gallery" to find the perfect pair for your t-shirts, hoodies, and more.'
            }
          />
          <svg
            className="hidden xl:block xl:absolute xl:top-0 xl:left-[17%] xl:w-[29.5%] 2xl:top-0 2xl:w-[29.5%]"
            height="90"
            viewBox="0 0 497 60"
            fill="none"
          >
            <path
              d="M1 28C1 28 121.152 1 232.542 1C343.933 1 496 22.4412 496 22.4412"
              stroke="#00A6AC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />
          </svg>
          <HowToWorkCard
            img={"/images/landing/howItWorks/middleIcon.svg"}
            title={"MATCH THE DESIGN & COLOR"}
            desc={
              "Find a design that complements your kicks and explore our range of t-shirts, hoodies, and more to complete your ensemble."
            }
          />

          <svg
            className="hidden xl:block xl:absolute xl:top-0 xl:right-[17%] xl:w-[29.5%] 2xl:top-0 2xl:w-[29.5%]"
            height="95"
            viewBox="0 0 512 5"
            fill="none"
          >
            <path
              d="M1 14.0254C1 14.0254 100.229 34 252.505 34C404.781 34 511 1 511 1"
              stroke="#00A6AC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />
          </svg>
          <HowToWorkCard
            img={"/images/landing/howItWorks/rightIcon.svg"}
            title={"SEAMLESS STYLE DELIVERED"}
            desc={`Rest assured, we'll swiftly deliver the exact product you've chosen right to your doorstep. 100% color match guaranteed.`}
          />
        </div>
      </div>
      <SearchSneakersBtn />
    </section>
  );
};

export default HowItWorks;

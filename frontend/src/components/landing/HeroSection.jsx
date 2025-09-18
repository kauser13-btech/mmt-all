import { useMemo } from 'react';

const HeroSection = ({
  leftBanners,
  rightBanners,
  currentLeftSlider,
  currentRightSlider
}) => {
  // Memoize class strings to prevent recalculation
  const classes = useMemo(() => ({
    container: "md:mt-5 flex items-center justify-center",
    heroWrapper: "inline-flex flex-col gap-4 items-center relative md:-mb-12 xl:mt-8 xl:-mb-20",
    leftSlideDesktop: "md:block hidden absolute top-10 -left-32 xl:-left-64",
    title: "font-staatliches text-center text-hero-title text-2xl md:text-[30px] md:leading-7 md:tracking-[0.52px] xl:text-[50px] xl:leading-[54px]",
    mobileWrapper: "w-[287px] -mb-12 md:hidden relative",
    mobileSlide: "absolute overflow-hidden md:hidden",
    mobileSlideSize: "h-[155px] w-[121px]",
    mobileImageContainer: "relative flex items-end justify-end",
    desktopWrapper: "hidden md:block relative md:mt-5",
    desktopSlideSize: "md:h-7 md:w-7 xl:w-16 xl:h-16",
    leftSlidePosition: "absolute z-30 bg-center md:top-[92px] md:left-[82px] xl:top-48 xl:left-[160px]",
    rightSlidePosition: "absolute z-30 bg-center md:top-[95px] md:right-[94px] xl:top-48 xl:right-[188px]",
    mainImage: "w-[397px] h-auto relative z-20 xl:w-[803px]",
    rightSlideDesktop: "md:block hidden absolute top-10 -right-28 xl:-right-[15.5rem]"
  }), []);

  // Memoize default images
  const defaultImages = useMemo(() => ({
    left: '/images/landing/slider/imageleft/left1.webp',
    right: '/images/landing/slider/imageright/right1.webp',
    mobileMain1: '/images/landing/slider/imagemiddle/mobile1.webp',
    mobileMain2: '/images/landing/slider/imagemiddle/mobile2.webp',
    desktopMain: "/images/landing/slider/imagemiddle/middle1.webp"
  }), []);

  // Memoize slide components to prevent unnecessary re-renders
  const SlideComponent = ({ banner, index, position, heightWidth, isActive, defaultImage }) => (
    <Slide
      key={`slide-${index}`}
      position={position}
      heightWidth={heightWidth}
      image={banner.image ?? defaultImage}
      isActive={isActive}
    />
  );

  // Render slide lists with proper memoization
  const renderSlides = (banners, currentSlider, position, heightWidth, defaultImage) => {
    if (!banners?.length) {
      console.log('No banners available');
      return null;
    }

    return banners.map((banner, index) => (
      <SlideComponent
        key={index}
        banner={banner}
        index={index}
        position={position}
        heightWidth={heightWidth}
        isActive={index === currentSlider}
        defaultImage={defaultImage}
      />
    ));
  };

  return (
    <div className={classes.container}>
      <div className={classes.heroWrapper}>
        {/* Desktop Left Slides */}
        {renderSlides(
          leftBanners,
          currentLeftSlider,
          classes.leftSlideDesktop,
          undefined,
          defaultImages.left
        )}

        {/* Hero Title */}
        <div className={classes.title}>
          <p>Match your Outfits</p>
          <p>to your Sneakers</p>
        </div>

        {/* Mobile Section */}
        <div className={classes.mobileWrapper}>
          {/* Mobile Slides */}
          {renderSlides(
            leftBanners,
            currentLeftSlider,
            classes.mobileSlide,
            classes.mobileSlideSize,
            defaultImages.left
          )}

          {/* Mobile Main Images */}
          <div className={classes.mobileImageContainer}>
            <img
              src={defaultImages.mobileMain1}
              alt="Main Mobile Image 1"
              loading="lazy"
            />
            <img
              src={defaultImages.mobileMain2}
              alt="Main Mobile Image 2"
              loading="lazy"
            />
          </div>
        </div>

        {/* Desktop Section */}
        <div className={classes.desktopWrapper}>
          {/* Desktop Left Slides */}
          {renderSlides(
            leftBanners,
            currentLeftSlider,
            classes.leftSlidePosition,
            classes.desktopSlideSize,
            defaultImages.left
          )}

          {/* Desktop Main Image */}
          <img
            className={classes.mainImage}
            src={defaultImages.desktopMain}
            alt="Main Desktop Hero Image"
            loading="lazy"
          />

          {/* Desktop Right Slides */}
          {renderSlides(
            rightBanners,
            currentRightSlider,
            classes.rightSlidePosition,
            classes.desktopSlideSize,
            defaultImages.right
          )}
        </div>

        {/* Desktop Right Slides */}
        {renderSlides(
          rightBanners,
          currentRightSlider,
          classes.rightSlideDesktop,
          undefined,
          defaultImages.right
        )}
      </div>
    </div>
  );
};

export default HeroSection;


const Slide = ({ image, isActive, position, heightWidth = 'w-[156px] h-full max-h-[465px] xl:w-[321px]' }) => {
  return (
    <div
      className={`${heightWidth} ${position} bg-no-repeat bg-contain transition-opacity duration-[1.5s] ease-in-out
       ${isActive ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
};
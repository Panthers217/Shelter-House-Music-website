import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroPic1 from "../assets/Shelter-House-coming soon.png";
import welcomeLogo from "../assets/Shelter-house-logo.png";
import FadeCarousel, { FadeCarouselImages } from "./FadeCarousel";
import { useApiData } from "../context/ApiDataContext.jsx";
    // { id: 1, src: 'https://via.placeholder.com/300', alt: 'Image 1', title: 'Image 1' }

const DemoBannerMobile = ({ albumImages, fadeOut, textHeadline, isDataLoaded }) => {
  return (
    <div data-layer="Frame 32" className="Frame32  w-[30rem]  h-auto aspect-[425/630] minMobile:aspect-[320/475]  relative ">
       {/* welcome logo */}

      <div data-layer="WelcomeSvg" className="Welcomesvg z-10 w-full h-48 right-[10%] top-[0%] minMobile:ml-[11%] absolute opacity-30"  style={{ width: '-webkit-fill-available', minwidth: '-webkit-fill-available' }}>
          <img data-layer="shelter-logo" className="ShelterLogo w-full  pl-[15%] left-0 top-0 minMobile:pt-[-10%]  minMobile:pl-[0%] absolute" src={welcomeLogo} alt="Shelter House Music Logo" />
      
      </div>

      {/* Image carousel */}
      <div data-layer="Frame 30" className="Frame30 w-full aspect-{423.68/423.68} left-0 top-[166.82px] absolute">
        {/* <img data-layer="envato-labs-ai-3b01044f-1de4-4452-9c34-535e87650b3f 2" className="EnvatoLabsAi3b01044f1de444529c34535e87650b3f2  left-0 top-0 absolute" src={heroPic1} /> */}
       <div className="flex flex-1 z-0 w-full h-full left-0 top-0 absolute">
        <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [ welcomeLogo]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={true} indicatorVisibility={false} />
        </div>
        <div data-layer="ButtonGroup" className="Buttongroup w-full left-0 top-0 absolute flex flex-col items-center pt-[11%] z-50 pointer-events-none">
          {textHeadline && <div data-layer="Title" className={`Title mainTitle mt-8 mb-6 text-center text-shelter-white text-[6vw] sm:text-[5vw] font-bold font-['Roboto'] leading-tight transition-opacity duration-1000 ${!isDataLoaded || fadeOut ? 'opacity-0' : 'opacity-100'}`}>{textHeadline}</div>}
          <div data-layer="ButtonFrames" className="Buttonframes w-full flex flex-col justify-center items-center gap-3 mt-4 pointer-events-auto">
            <div data-layer="Frame 29" className="Frame29 w-full flex justify-center items-center gap-4 pt-[15%] text-nowrap">
              <Link to="/music" data-layer="Frame" className="Frame flex-grid min-w-[120px] max-w-[70vw] px-6 py-3 bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 rounded-md shadow-md flex justify-center items-center transition-all duration-200">
                <span data-layer="Button Text" className="ButtonText text-center text-shelter-charcoal text-lg sm:text-xl font-medium font-['Roboto'] leading-7">Explore Music</span>
              </Link>
              <Link to="/sign-up" data-layer="Frame" className="Frame flex-grid min-w-[100px] max-w-[60vw] px-6 py-3  bg-green-600 text-shelter-white border border-shelter-honey hover:bg-purple-600/100 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
                <span data-layer="Button Text" className="ButtonText  text-center text-shelter-white text-lg sm:text-xl font-medium font-['Roboto'] leading-7 ">Join Now</span>
              </Link>
            </div>
            <Link to="/support-ministry" className="px-6 py-2 bg-shelter-slate/40 border border-shelter-honey/40 text-shelter-honey hover:bg-shelter-honey/10 hover:border-shelter-honey hover:text-shelter-amber font-semibold text-base sm:text-lg transition-all duration-200 rounded-md">
              Support the Ministry
            </Link>
          </div>
        </div>
    </div>
    {/* Page Indicator */}
    <div className="MainPageIndicatorContainer flex absolute w-full bottom-[10%] minMobile:bottom-[6%] justify-center">
    
      <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, welcomeLogo]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} />
    </div>
      
</div>
  )
}


const DemoBannerTablet = ({ albumImages, fadeOut, textHeadline, isDataLoaded }) => {
  // console.log("🖥️ DemoBannerTablet is rendering");
  return (
    <div className="relative w-full max-w-[1440px] mt-[-30%] aspect-[1/1] mx-auto  flex flex-col items-center justify-center  rounded-[1.4vw]">
     
      
      {/* Welcome Logo */}
      <div className="absolute left-[30%] top-[5%] w-[50vw] max-w-[606px] h-[70%] z-30 pointer-events-none opacity-20">
        <img
          className="w-full h-full object-contain"
          src={welcomeLogo}
          alt="Shelter House Music Logo"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-[0%] top-[45%] pl-[0%] w-[100%]  h-[63.5%] max-h-[442px] z-10">
       
         <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [ welcomeLogo]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw] shadow-lg border border-black absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-50 pt-[50%] pb-[3%] px-[12%] pointer-events-none">
        {textHeadline && <div className={`mainTitle text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw] transition-opacity duration-1000 ${!isDataLoaded || fadeOut ? 'opacity-0' : 'opacity-100'}`}>
         {textHeadline}
        </div>}
        <div className="w-full flex flex-col justify-center items-center gap-[1.5vw] mb-[15%] pointer-events-auto">
          <div className="flex flex-row justify-center items-center gap-[2vw]">
            <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Explore Music
            </Link>
            <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 text-shelter-white border border-shelter-honey hover:bg-purple-600/100 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Join Now
            </Link>
          </div>
          <Link to="/support-ministry" className="px-[3vw] py-[0.8vw] bg-shelter-slate/40 border border-shelter-honey/40 text-shelter-honey hover:bg-shelter-honey/10 hover:border-shelter-honey hover:text-shelter-amber font-semibold text-[clamp(1rem,1.8vw,1.5rem)] transition-all duration-200 rounded-[0.5vw]">
            Support the Ministry
          </Link>
        </div>

         {/* page indicator */}
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
          
                {/* <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, welcomeLogo]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} /> */}

        </div>
      </div>
    </div>
  );
};
const DemoBannerLaptop = ({albumImages, fadeOut, textHeadline, isDataLoaded}) => {
  return (
    <div className="relative w-full max-w-[1440px] aspect-[1440/700] mx-auto bg-[#101516] flex flex-col items-center justify-center  rounded-[1.4vw]">
     
      {/* Welcome Logo */}
      <div className="absolute left-[-2.3vw]  top-0 w-[30vw] max-w-[606px] h-[60%] z-10 pointer-events-none  opacity-20">
        <img
          className="w-full h-full object-contain"
          src={welcomeLogo}
          alt="Shelter House Music Logo"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-[36%] top-[10%] w-[36.8%] max-w-[530px] h-[63.5%] max-h-[442px] z-20 ">
        
         <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [ welcomeLogo]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw] shadow-lg border border-black absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col top-[-10%] justify-center items-center z-50 pt-[10%] pb-[3%] px-[12%] pointer-events-none">
        {textHeadline && <div className={`mainTitle text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw] transition-opacity duration-1000 ${!isDataLoaded || fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {textHeadline}
        </div>}
        <div className="w-full flex flex-col justify-center items-center gap-[1.5vw] mb-[15%] pointer-events-auto">
          <div className="flex flex-row justify-center items-center gap-[2vw]">
            <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Explore Music
            </Link>
            <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 text-shelter-white border border-shelter-honey hover:bg-purple-600/100 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Join Now
            </Link>
          </div>
          <Link to="/support-ministry" className="px-[3vw] py-[0.8vw] bg-shelter-slate/40 border border-shelter-honey/40 text-shelter-honey hover:bg-shelter-honey/10 hover:border-shelter-honey hover:text-shelter-amber font-semibold text-[clamp(1rem,1.8vw,1.5rem)] transition-all duration-200 rounded-[0.5vw]">
            Support the Ministry
          </Link>
        </div>

         {/* page indicator */}
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
         
                {/* <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [ welcomeLogo]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} /> */}

        </div>
      </div>
    </div>
  );
};

const DemoBannerDesktop = ({albumImages, fadeOut, textHeadline, isDataLoaded}) => {
  return (
    <div
      data-layer="Hero section desktop"
      className="HeroSectionDesktop w-full  aspect-[1920/928]  rounded-none flex flex-col justify-center items-center overflow-hidden relative  mx-auto "
    >
     
      {/* Welcome Logo */}
          <div className="absolute left-[-9.3vw] top-[-13%] w-[50vw] max-w-[808px] h-[87%] z-10 pointer-events-none opacity-20">
            <img
              className="w-full h-full object-contain"
              src={welcomeLogo}
              alt="Shelter House Music Logo"
            />
          </div>
      {/* Hero Image */}
      <div className="absolute left-[35%] top-[15%] w-[36.8%] max-w-[706px] h-[63.5%] max-h-[589px] z-20">
          <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [ welcomeLogo]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw]  absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full text-nowrap h-full flex flex-col justify-center items-center top-[-10%] z-50 pt-[8%] pb-[3%] px-[12%] pointer-events-none">
        {textHeadline && <div className={`mainTitle text-center text-shelter-white font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,7vw,6.6rem)] mb-[3vw] transition-opacity duration-1000 ${!isDataLoaded || fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {textHeadline}
        </div>}
        <div className="w-full flex flex-col justify-center items-center gap-[1.5vw] mb-[2vw] pointer-events-auto">
          <div className="flex flex-row justify-center items-center gap-[2vw]">
            <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Explore Music
            </Link>
            <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 text-shelter-white border border-shelter-honey hover:bg-purple-600/100 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
              Join Now
            </Link>
          </div>
          <Link to="/support-ministry" className="px-[3vw] py-[0.8vw] bg-shelter-slate/40 border border-shelter-honey/40 text-shelter-honey hover:bg-shelter-honey/10 hover:border-shelter-honey hover:text-shelter-amber font-semibold text-[clamp(1rem,1.8vw,1.5rem)] transition-all duration-200 rounded-[0.5vw]">
            Support the Ministry
          </Link>
        </div>

         {/* page indicator */}
        <div className="w-full flex pt-[30%] flex-row absolute justify-center items-center gap-[1vw]">
          {/* <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#aa2a46] rounded-full" /> */}
                {/* <FadeCarousel images={[heroPic1, welcomeLogo]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} /> */}

        </div>
      </div>
    </div>
  );
};

const HomeBanner = () => {
  const { dbSnapshot, websiteSettings } = useApiData();
  const [fadeOut, setFadeOut] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const textHeadline = websiteSettings ? (websiteSettings.hero_title || "Strengthening Hearts Through Music") : "";

  useEffect(() => {
    if (dbSnapshot) {
      const fadeInTimer = setTimeout(() => {
        setIsDataLoaded(true);
      }, 2000);
      
      const fadeOutTimer = setTimeout(() => {
        setFadeOut(true);
      }, 7000); // 2s delay + 5s visible = 7s total
      
      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(fadeOutTimer);
      };
    }
  }, [dbSnapshot]);

 let albumImages = []
  // Only log albums from dbSnapshot
  if (dbSnapshot && dbSnapshot.albums && dbSnapshot.albums.records) {
    // console.log("albums in dbSnapshot:", dbSnapshot.albums.records);
     albumImages = dbSnapshot.albums.records
      .map((album) => ({
        id: album.id,
        src: album.cover_url,
        alt: album.cover_url,
        title: album.title,
      }))
      // .filter((image) => image.src);
    
   
  }
  // console.log("Album images for carousel:", albumImages)

  return (
    <>
    {/* Mobile only */}
  <div className="block sm:flex md:hidden lg:hidden xl:hidden bg-black ">
    <DemoBannerMobile albumImages={albumImages} fadeOut={fadeOut} textHeadline={textHeadline} isDataLoaded={isDataLoaded} />
  </div>
  {/* Tablet only */}
  <div className="hidden sm:hidden md:flex lg:hidden xl:hidden bg-black w-full rounded-[1.4vw]">
    <DemoBannerTablet albumImages={albumImages} fadeOut={fadeOut} textHeadline={textHeadline} isDataLoaded={isDataLoaded} />
  </div>
  {/* Desktop only */}
  <div className="hidden sm:hidden md:hidden lg:flex xl:hidden bg-black w-[70%] rounded-[1.4vw] ">
    <DemoBannerLaptop albumImages={albumImages} fadeOut={fadeOut} textHeadline={textHeadline} isDataLoaded={isDataLoaded} />
  </div>
  <div className="hidden  sm:hidden md:hidden lg:hidden xl:flex bg-black rounded-[1.4vw]">
    <DemoBannerDesktop albumImages={albumImages} fadeOut={fadeOut} textHeadline={textHeadline} isDataLoaded={isDataLoaded} />
  </div>
    </>
  );
};

export default HomeBanner;
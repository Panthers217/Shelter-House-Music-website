import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroPic1 from "../assets/hero_section_pics/heroPic1.png";
import heroWelcomePic from "../assets/hero_section_pics/heroWelcomePic.svg";
import FadeCarousel, { FadeCarouselImages } from "./FadeCarousel";
import { useApiData } from "../context/ApiDataContext.jsx";

    // { id: 1, src: 'https://via.placeholder.com/300', alt: 'Image 1', title: 'Image 1' },




const DemoBannerMobile = ({ albumImages, fadeOut }) => {
  return (
    <div data-layer="Frame 32" className="Frame32  w-[20rem] h-auto aspect-[425/630] minMobile:aspect-[320/475]  relative bg-[#101516]">
       {/* welcome logo */}

      <div data-layer="WelcomeSvg" className="Welcomesvg z-10 w-full h-48 left-0 top-[0%] minMobile:ml-[11%] absolute"  style={{ width: '-webkit-fill-available', minwidth: '-webkit-fill-available' }}>
          <img data-layer="envato-labs-image-edit 4" className="EnvatoLabsImageEdit4 w-full  pl-[15%] left-0 top-0 minMobile:pt-[10%]  minMobile:pl-[0%] absolute" src={heroWelcomePic} />
      
      </div>

      {/* Image carousel */}
      <div data-layer="Frame 30" className="Frame30 w-full aspect-{423.68/423.68} left-0 top-[166.82px] absolute">
        {/* <img data-layer="envato-labs-ai-3b01044f-1de4-4452-9c34-535e87650b3f 2" className="EnvatoLabsAi3b01044f1de444529c34535e87650b3f2  left-0 top-0 absolute" src={heroPic1} /> */}
       <div className="flex z-0 w-full h-full left-0 top-0 absolute">
        <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={true} indicatorVisibility={false} />
        </div>
        <div data-layer="ButtonGroup" className="Buttongroup w-full left-0 top-0 absolute flex flex-col items-center pt-[11%] z-50 pointer-events-none">
          <div data-layer="Title" className={`Title mainTitle mt-8 mb-6 text-center text-[#fffced] text-[6vw] sm:text-[5vw] font-bold font-['Roboto'] leading-tight transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>Experience the Soul of Music</div>
          <div data-layer="ButtonFrames" className="Buttonframes w-full flex justify-center items-center gap-4 mt-4 pointer-events-auto">
            <div data-layer="Frame 29" className="Frame29 w-full flex justify-center items-center gap-4 pt-[15%] text-nowrap">
              <Link to="/music" data-layer="Frame" className="Frame flex-1 min-w-[120px] max-w-[70vw] px-6 py-3 bg-[#aa2a46] hover:bg-[#8b1f35] hover:scale-105 hover:shadow-lg active:scale-100 rounded-md shadow-md flex justify-center items-center transition-all duration-200">
                <span data-layer="Button Text" className="ButtonText text-center text-[#fffced] text-lg sm:text-xl font-medium font-['Roboto'] leading-7">Explore Music</span>
              </Link>
              <Link to="/sign-up" data-layer="Frame" className="Frame flex-1 min-w-[100px] max-w-[60vw] px-6 py-3 bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-100 rounded-md shadow-md outline outline-1 outline-green-500/20 flex justify-center items-center transition-all duration-200">
                <span data-layer="Button Text" className="ButtonText text-center text-[#fffced] text-lg sm:text-xl font-medium font-['Roboto'] leading-7">Join Now</span>
              </Link>
            </div>
          </div>
        </div>
    </div>
    {/* Page Indicator */}
    <div className="MainPageIndicatorContainer flex absolute w-full bottom-[10%] minMobile:bottom-[6%] justify-center">
    {/* <div data-layer="pageIndicator" className=" flex absolute w-[80.10px] h-[15.89px]   ">
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[0.66px] top-0 absolute bg-[#fffced]/30 rounded-full" />
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[32.44px] top-0 absolute bg-[#fffced]/30 rounded-full" />
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[64.21px] top-0 absolute bg-[#aa2a46] rounded-full" />
      </div> */}
      <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} />
    </div>
      
</div>
  )
}


const DemoBannerTablet = ({ albumImages, fadeOut }) => {
  // console.log("🖥️ DemoBannerTablet is rendering");
  return (
    <div className="relative w-full max-w-[1440px] mt-[-30%] aspect-[1/1] mx-auto bg-[#101516] flex flex-col items-center justify-center  rounded-[1.4vw]">
      {/* White background frame */}
      {/* <div className="absolute inset-0 w-full h-[max-content] bg-white rounded-[1.4vw] z-0" /> */}
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-[max-content] bg-[#101516] rounded-[1.4vw] z-0" />
      {/* Welcome SVG */}
      <div className="relative left-0 top-[30%] w-[50vw] max-w-[606px] h-[60%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-contain"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-[0%] top-[45%] pl-[10%] w-[100%]  h-[63.5%] max-h-[442px] z-20">
        {/* <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        /> */}
         <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw] shadow-lg border border-black absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-50 pt-[10%] pb-[3%] px-[12%] pointer-events-none">
        <div className={`mainTitle text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw] transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[15%] pointer-events-auto">
          <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] hover:bg-[#8b1f35] hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Explore Music
          </Link>
          <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md outline outline-1 outline-green-500/20 text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Join Now
          </Link>
        </div>

         {/* page indicator */}
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
          {/* <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" /> */}
                <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} />

        </div>
      </div>
    </div>
  );
};
const DemoBannerLaptop = ({albumImages, fadeOut}) => {
  return (
    <div className="relative w-full max-w-[1440px] aspect-[1440/700] mx-auto bg-[#101516] flex flex-col items-center justify-center  rounded-[1.4vw]">
      {/* White background frame */}
      {/* <div className="absolute inset-0 w-full h-[max-content] bg-white rounded-[1.4vw] z-0" /> */}
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-[max-content] bg-[#101516] rounded-[1.4vw] z-0" />
      {/* Welcome SVG */}
      <div className="absolute left-0 top-0 w-[30vw] max-w-[606px] h-[60%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-contain"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-[33%] top-[18%] w-[36.8%] max-w-[530px] h-[63.5%] max-h-[442px] z-20">
        {/* <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        /> */}
         <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw] shadow-lg border border-black absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-50 pt-[10%] pb-[3%] px-[12%] pointer-events-none">
        <div className={`mainTitle text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw] transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[15%] pointer-events-auto">
          <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] hover:bg-[#8b1f35] hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Explore Music
          </Link>
          <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md outline outline-1 outline-green-500/20 text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Join Now
          </Link>
        </div>

         {/* page indicator */}
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
          {/* <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" /> */}
                <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} />

        </div>
      </div>
    </div>
  );
};

const DemoBannerDesktop = ({albumImages, fadeOut}) => {
  return (
    <div
      data-layer="Hero section desktop"
      className="HeroSectionDesktop w-full  aspect-[1920/928]  rounded-none flex flex-col justify-center items-center overflow-hidden relative bg-[#101516] mx-auto"
    >
      {/* White background frame */}
      {/* <div className="absolute inset-0 w-full h-full bg-white rounded-[none] z-0" /> */}
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[none] z-0" />
      {/* Welcome SVG */}
      <div className="absolute left-[-6.3vw] top-[-13%] w-[50vw] max-w-[808px] h-[87%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-none"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-none top-[20%] w-[36.8%] max-w-[706px] h-[63.5%] max-h-[589px] z-20">
        {/* <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        /> */}
          <FadeCarousel images={albumImages.length > 0 ? albumImages.map(img => img.src) : [heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`w-full h-full object-cover rounded-[1vw]  absolute`} imageVisibility={true} indicatorVisibility={false} />
      </div>
      {/* Main Content */}
      <div className="relative w-full text-nowrap h-full flex flex-col justify-center items-center z-50 pt-[8%] pb-[3%] px-[12%] pointer-events-none">
        <div className={`mainTitle text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,7vw,6.6rem)] mb-[3vw] transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[2vw] pointer-events-auto">
          <Link to="/music" className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] hover:bg-[#8b1f35] hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Explore Music
          </Link>
          <Link to="/sign-up" className="flex-0 px-[2vw] py-[1vw] bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-100 rounded-[0.7vw] shadow-md outline outline-1 outline-green-500/20 text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all duration-200">
            Join Now
          </Link>
        </div>

         {/* page indicator */}
        <div className="w-full flex pt-[30%] flex-row absolute justify-center items-center gap-[1vw]">
          {/* <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#aa2a46] rounded-full" /> */}
                <FadeCarousel images={[heroPic1, heroWelcomePic]} interval={3500} ImageDivName={`left-0 top-0 absolute`} imageVisibility={false} indicatorVisibility={true} />

        </div>
      </div>
    </div>
  );
};

const HomeBanner = () => {
  const { dbSnapshot } = useApiData();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
  <div className="block sm:flex md:hidden lg:hidden xl:hidden ">
    <DemoBannerMobile albumImages={albumImages} fadeOut={fadeOut} />
  </div>
  {/* Tablet only */}
  <div className="hidden sm:hidden md:flex lg:hidden xl:hidden">

    <DemoBannerTablet albumImages={albumImages} fadeOut={fadeOut} />
  </div>
  {/* Desktop only */}
  <div className="hidden sm:hidden md:hidden lg:block xl:hidden ">
    <DemoBannerLaptop albumImages={albumImages} fadeOut={fadeOut} />
  </div>
  <div className="hidden  sm:hidden md:hidden lg:hidden xl:flex">
    <DemoBannerDesktop albumImages={albumImages} fadeOut={fadeOut} />
  </div>
    </>
  );
};

export default HomeBanner;
import React, { useState, useEffect } from "react";
import heroPic1 from "../assets/hero_section_pics/heroPic1.png";
import heroWelcomePic from "../assets/hero_section_pics/heroWelcomePic.svg";
import HomeBanner from "./HomeBanner";
import { ArtistGallery } from "./ArtistGallery";
import VideoPlayerComponent from "./VideoPlayerComponent";
import { useFeatures } from "../context/FeaturesContext";
import ImageCarousel from "./ImageCarousel";
import PopularAlbums from "./PopularAlbums";
import ZoomFit from "./ZoomFit";
import DemoBanner from "./DemoBanner";

const DemoBannerMobile = () => {
  return (
    <div
      data-layer="Frame 32"
      className="Frame32 w-[425px] h-[630.22px] relative bg-[#101516]"
    >
      <div
        data-layer="Frame 30"
        className="Frame30 w-full aspect-{423.68/423.68} left-0 top-[166.82px] absolute"
      >
        <img
          data-layer="envato-labs-ai-3b01044f-1de4-4452-9c34-535e87650b3f 2"
          className="EnvatoLabsAi3b01044f1de444529c34535e87650b3f2  left-0 top-0 absolute"
          src={heroPic1}
        />
        <div
          data-layer="ButtonGroup"
          className="Buttongroup text-nowrap size-[423.68px] left-0 top-0 absolute"
        >
          <div
            data-layer="Title"
            className="Title left-[38.40px] top-[77.12px] absolute text-center justify-start text-[#fffced] text-[26.48px] font-bold font-['Roboto'] leading-[29.13px]"
          >
            Experience the Soul of Music
          </div>
          <div
            data-layer="ButtonFrames"
            className="Buttonframes w-[423.68px] h-[81.43px] px-[0.58px] pt-[0.66px] left-0 top-[238.65px] absolute inline-flex justify-center items-center gap-[19.86px]"
          >
            <div
              data-layer="Frame 29"
              className="Frame29 w-[421.03px] h-[80.76px] flex justify-start items-center gap-[19.86px]"
            >
              <div
                data-layer="Frame"
                className="Frame w-[223.75px] px-[42.37px] py-[22.51px] bg-[#aa2a46] rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_5.295950412750244px_7.943925857543945px_0px_rgba(0,0,0,0.10)] flex justify-start items-start"
              >
                <div
                  data-layer="Button Text"
                  className="ButtonText text-center justify-start text-[#fffced] text-2xl font-medium font-['Roboto'] leading-9"
                >
                  Explore Music
                </div>
              </div>
              <div
                data-layer="Frame"
                className="Frame w-[177.41px] px-[43.69px] py-[22.51px] bg-[#fffced]/10 rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_5.295950412750244px_7.943925857543945px_0px_rgba(0,0,0,0.10)] outline outline-[1.32px] outline-offset-[-1.32px] outline-[#fffced]/20 flex justify-start items-start"
              >
                <div
                  data-layer="Button Text"
                  className="ButtonText text-center justify-start text-[#fffced] text-2xl font-medium font-['Roboto'] leading-9"
                >
                  Join Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-layer="pageIndicator"
        className="Pageindicator w-[80.10px] h-[15.89px] left-[172.12px] top-[599.77px] absolute"
      >
        <div
          data-layer="Rectangle"
          className="Rectangle size-[15.89px] left-[0.66px] top-0 absolute bg-[#fffced]/30 rounded-full"
        />
        <div
          data-layer="Rectangle"
          className="Rectangle size-[15.89px] left-[32.44px] top-0 absolute bg-[#fffced]/30 rounded-full"
        />
        <div
          data-layer="Rectangle"
          className="Rectangle size-[15.89px] left-[64.21px] top-0 absolute bg-[#aa2a46] rounded-full"
        />
      </div>
      <div
        data-layer="WelcomeSvg"
        className="Welcomesvg w-[423.68px] h-48 left-0 top-0 absolute"
      >
        <img
          data-layer="envato-labs-image-edit 4"
          className="EnvatoLabsImageEdit4 w-[423.68px] pl-[15%] left-0 top-0 absolute"
          src={heroWelcomePic}
        />
      </div>
    </div>
  );
};

// const DemoBannerTablet = () => {
//   return (
//     <div data-layer="Hero section Tab component" className="HeroSectionTabComponent size- rounded-[20px] inline-flex flex-col justify-start items-start overflow-hidden">
//     <div data-layer="Frame" className="Frame w-[768px] bg-white flex flex-col justify-start items-start overflow-hidden">
//         <div data-layer="Frame" className="Frame self-stretch bg-[#101516] flex flex-col justify-start items-start">
//             <div data-layer="Frame" className="Frame self-stretch relative flex flex-col justify-start items-start">
//                 <img data-layer="Image 1" className="Image1  w-[530px] h-[442px] p-2.5 left-[126px] top-[155px] absolute" src={heroPic1} />
//                 <div data-layer="Frame" className="Frame text-nowrap z-10 self-stretch pl-[236px] pr-[235px] pt-72 pb-12 flex flex-col justify-center items-center gap-[99.67px]">
//                     <div data-layer="Experience the Soul of Music" className="ExperienceTheSoulOfMusic text-center justify-start text-[#fffced] text-[40px] font-bold font-['Roboto'] leading-[44px]">Experience the Soul of Music</div>
//                     <div data-layer="Frame" className="Frame size- pl-[0.44px] pr-[0.42px] pt-[0.50px] inline-flex justify-end items-start gap-[15px]">
//                         <div data-layer="Frame" className="Frame size- px-8 py-[17px] bg-[#aa2a46] rounded-sm shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start">
//                             <div data-layer="Explore Music" className="ExploreMusic text-center justify-start text-[#fffced] text-lg font-medium font-['Roboto'] leading-[27px]">Explore Music</div>
//                         </div>
//                         <div data-layer="Frame" className="Frame size- px-[33px] py-[17px] bg-[#fffced]/10 rounded-sm shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-[#fffced]/20 inline-flex flex-col justify-start items-start">
//                             <div data-layer="Join Now" className="JoinNow text-center justify-start text-[#fffced] text-lg font-medium font-['Roboto'] leading-[27px]">Join Now</div>
//                         </div>
//                     </div>
//                     <div data-layer="Frame" className="Frame size- pl-[0.50px] inline-flex justify-center items-start gap-3">
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#aa2a46] rounded-full" />
//                     </div>
//                 </div>
//                 <div data-layer="Frame 20" className="Frame20 w-[443px] h-72 left-[20%] top-[10%] absolute">
//                     <img data-layer="envato-labs-image-edit 1" className="EnvatoLabsImageEdit1 size-[606px] left-[-105px] top-[-167.50px] absolute" src={heroWelcomePic} />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//   )
// }

// const DemoBannerLaptop = () => {
//   return (

//     <div data-layer="Hero section desktop" className="HeroSectionDesktop w-[1440px] rounded-[20px] inline-flex flex-col justify-start items-start overflow-hidden">
//     <div data-layer="Frame" className="Frame self-stretch bg-white flex flex-col justify-start items-start overflow-hidden">
//         <div data-layer="Frame" className="Frame self-stretch bg-[#101516] flex flex-col justify-start items-start">
//             <div data-layer="Frame" className="Frame self-stretch relative flex flex-col justify-start items-start">
//                 <img data-layer="Image 1" className="Image1 w-[530px] h-[442px] p-2.5 left-[474px] top-[138.50px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black" src={heroPic1} />
//                 <div data-layer="Frame" className= "Frame text-nowrap z-10 self-stretch pl-[236px] pr-[235px] pt-72 pb-12 flex flex-col justify-center items-center gap-[99.67px]">
//                     <div data-layer="Experience the Soul of Music" className="ExperienceTheSoulOfMusic text-center justify-start text-[#fffced] text-[80px] font-bold font-['Roboto'] leading-[88px]">Experience the Soul of Music</div>
//                     <div data-layer="Frame" className="Frame size- pl-[0.44px] pr-[0.42px] pt-[0.50px] inline-flex justify-end items-start gap-[15px]">
//                         <div data-layer="Frame" className="Frame size- px-8 py-[17px] bg-[#aa2a46] rounded-sm shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start">
//                             <div data-layer="Explore Music" className="ExploreMusic text-center justify-start text-[#fffced] text-lg font-medium font-['Roboto'] leading-[27px]">Explore Music</div>
//                         </div>
//                         <div data-layer="Frame" className="Frame size- px-[33px] py-[17px] bg-[#fffced]/10 rounded-sm shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-[#fffced]/20 inline-flex flex-col justify-start items-start">
//                             <div data-layer="Join Now" className="JoinNow text-center justify-start text-[#fffced] text-lg font-medium font-['Roboto'] leading-[27px]">Join Now</div>
//                         </div>
//                     </div>
//                     <div data-layer="Frame" className="Frame size- pl-[3%] flex w-full m-[-3%] justify-center items-start gap-3">
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-3 bg-[#aa2a46] rounded-full" />
//                     </div>
//                 </div>
//                 <div data-layer="Frame 20" className="Frame20 size-100 left-[0] top-[-10%] absolute inline-flex justify-start items-center gap-2.5">
//                     <img data-layer="envato-labs-image-edit 1" className="EnvatoLabsImageEdit1 size-[606px]" src={heroWelcomePic} />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

//   )
// }

// const DemoBannerDesktop = () => {
//   return (
//     <div className="MainContainer w-full h-full flex-col justify-center items-center bg-[#101516]">

//    <div data-layer="Hero section desktop" className="HeroSectionDesktop w-[1920px] h-[928px] rounded-[26.67px] inline-flex flex-col justify-start items-start overflow-hidden">
//     <div data-layer="Frame" className="Frame self-stretch bg-white flex flex-col justify-start items-start overflow-hidden">
//         <div data-layer="Frame" className="Frame self-stretch bg-[#101516] flex flex-col justify-start items-start">
//             <div data-layer="Frame" className="Frame self-stretch relative flex flex-col justify-start items-start">
//                 <img data-layer="Image 1" className="Image1 w-[706.67px] h-[589.33px] p-[13.33px] left-[632px] top-[184.67px] absolute shadow-[0px_5.3333330154418945px_5.3333330154418945px_0px_rgba(0,0,0,0.25)] border-[1.33px] border-black" src={heroPic1} />
//                 <div data-layer="Frame" className="Frame self-stretch pl-[314.67px] pr-[313.33px] pt-96 pb-16 flex flex-col justify-center items-center gap-[132.89px]">
//                     <div data-layer="Experience the Soul of Music" className="ExperienceTheSoulOfMusic text-center justify-start text-[#fffced] text-[106.67px] font-bold font-['Roboto'] leading-[117.33px]">Experience the Soul of Music</div>
//                     <div data-layer="Frame" className="Frame size- pl-[0.58px] pr-[0.56px] pt-[0.67px] inline-flex justify-end items-start gap-5">
//                         <div data-layer="Frame" className="Frame size- px-[42.67px] py-[22.67px] bg-[#aa2a46] rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_5.3333330154418945px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start">
//                             <div data-layer="Explore Music" className="ExploreMusic text-center justify-start text-[#fffced] text-2xl font-medium font-['Roboto'] leading-9">Explore Music</div>
//                         </div>
//                         <div data-layer="Frame" className="Frame size- px-11 py-[22.67px] bg-[#fffced]/10 rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.00)] shadow-[0px_5.3333330154418945px_8px_0px_rgba(0,0,0,0.10)] outline outline-[1.33px] outline-offset-[-1.33px] outline-[#fffced]/20 inline-flex flex-col justify-start items-start">
//                             <div data-layer="Join Now" className="JoinNow text-center justify-start text-[#fffced] text-2xl font-medium font-['Roboto'] leading-9">Join Now</div>
//                         </div>
//                     </div>
//                     <div data-layer="Frame" className="Frame size- pl-[0.67px] inline-flex justify-center items-start gap-4">
//                         <div data-layer="Rectangle" className="Rectangle size-4 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-4 bg-[#fffced]/30 rounded-full" />
//                         <div data-layer="Rectangle" className="Rectangle size-4 bg-[#aa2a46] rounded-full" />
//                     </div>
//                 </div>
//                 <div data-layer="Frame 20" className="Frame20 size- left-[-140px] top-[-223.33px] absolute inline-flex justify-start items-center gap-[13.33px]">
//                     <img data-layer="envato-labs-image-edit 1" className="EnvatoLabsImageEdit1 size-[808px]" src={heroWelcomePic} />
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
// </div>

//   )
// }
const DemoBannerTablet = () => {
  return (
    <div className="relative w-full max-w-[900px] aspect-[900/700] mx-auto bg-[#101516] flex flex-col items-center justify-center overflow-hidden rounded-[2vw]">
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[2vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[2vw] z-0" />
      {/* Welcome SVG */}
      <div className="absolute  left-[5%] top-0 w-[40vw] max-w-[443px] h-[60%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-contain"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-none top-[22%] w-[59%] max-w-[530px] h-[63%] max-h-[442px] z-0">
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center z-30 pt-[12%] pb-[4%] px-[8%]">
        <div className=" absolute  text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2rem,5vw,3.5rem)] mb-[12%]">
          Experience the Soul of Music
        </div>
        <div className="  w-full flex flex-row justify-center items-center gap-[3vw] mt-[3%]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1rem,2vw,1.5rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1rem,2vw,1.5rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className=" absolute mt-[50%] w-full flex flex-row justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};
const DemoBannerLaptop = () => {
  return (
    <div className="relative w-full max-w-[1440px] aspect-[1440/700] mx-auto bg-[#101516] flex flex-col items-center justify-center overflow-hidden rounded-[1.4vw]">
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[1.4vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[1.4vw] z-0" />
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
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-30 pt-[10%] pb-[3%] px-[12%]">
        <div className="text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw]">
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[5%]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const DemoBannerDesktop = () => {
  return (
    <div
      data-layer="Hero section desktop"
      className="HeroSectionDesktop w-full  aspect-[1920/928] rounded-none flex flex-col justify-center items-center overflow-hidden relative bg-[#101516] mx-auto"
    >
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[1.4vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[1.4vw] z-0" />
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
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="relative w-full text-nowrap h-full flex flex-col justify-center items-center z-30 pt-[8%] pb-[3%] px-[12%]">
        <div className="text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,7vw,6.6rem)] mb-[3vw]">
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[2vw]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className="w-full flex pt-[30%] flex-row absolute justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const HomePageLayout = () => {
  const { isEnabled } = useFeatures();
  const isVideosEnabled = isEnabled('enable_videos');

  return (
    <>
    <ZoomFit>
      <div className="flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-16 bg-[#101516] py-8">
        <HomeBanner />
        <ArtistGallery />
        {isVideosEnabled && <VideoPlayerComponent />}
        {/* <ImageCarousel />  */}
        <PopularAlbums />
      </div>
      </ZoomFit>
    </>
  );
};

export default HomePageLayout;

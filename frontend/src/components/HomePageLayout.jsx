
import HomeBanner from "./HomeBanner";
import { ArtistGallery } from "./ArtistGallery";
import VideoPlayerComponent from "./VideoPlayerComponent";
import { useFeatures } from "../context/FeaturesContext";
import PopularAlbums from "./PopularAlbums";
import ZoomFit from "./ZoomFit";




const HomePageLayout = () => {
  const { isEnabled } = useFeatures();
  const isVideosEnabled = isEnabled('enable_videos');

  return (
    <>
    <ZoomFit>
      <div className="flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-16  bg-transparent py-8">
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

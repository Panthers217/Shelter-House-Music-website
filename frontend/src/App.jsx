import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component
import AdminSqlViewer from './components/AdminSqlViewer';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import backgroundImage from './assets/Shelter-House-img2.png';
import { NavbarProvider, useNavbar } from './context/NavbarContext';

// Import your components here
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Artist from "./components/Artist";
import Videos from "./components/Videos";
import Community from "./components/Community";
import Footer from "./components/Footer";
import Music from "./components/Music";
import Store from "./components/Store";
import About from "./components/About";
import News from "./components/News";
import Home from "./pages/Home";
import ArtistPage from "./pages/ArtistPage"; // Assuming you have this page
import ResponsiveNavbar from "./components/ResponsiveNavbar";
import ArtistOverview from "./components/ArtistOverview";
import ArtistStore from "./components/ArtistStore";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PurchaseHistory from "./components/PurchaseHistory";
import SecureDownload from "./pages/SecureDownload";
import SignUp from "./components/SignUp"; // Assuming you have a SignUp component
import Login from "./components/Login"; // Assuming you have a Login component
import UploadNewArtist from './components/adminComponents/UploadNewArtist';
import NewsletterCampaigns from './components/adminComponents/NewsletterCampaigns';
import FaqManagement from './components/adminComponents/FaqManagement';
import Faq from './pages/Faq';
import Terms from './pages/Terms';
import SupportMinistry from './pages/SupportMinistry';
import DonationConfirmation from './pages/DonationConfirmation';
import ThemeDemo from './components/ThemeDemo';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import { useUserLogin } from './hooks/useUserLogin.js';
import { Navigate, useParams } from 'react-router-dom';
import { useApiData } from './context/ApiDataContext';
import ProjectWalkthroughVideo from './components/ProjectWalkthroughVideo';
import ZoomFit from './components/ZoomFit.jsx';
import ProjectStructureViewer from './components/ProjectStructureViewer';
import DemoBanner from './components/DemoBanner.jsx';
import WelcomeToast from './components/WelcomeToast.jsx';

function ArtistStoreWrapper() {
  const { artistId } = useParams();
  const { dbSnapshot } = useApiData();
  
  // Find artist name from artists data
  let artistName = "Artist";
  if (dbSnapshot && dbSnapshot.artists && dbSnapshot.artists.records) {
    const artist = dbSnapshot.artists.records.find(a => a.id === parseInt(artistId));
    if (artist) artistName = artist.name;
  }
  
  return <ArtistStore artistId={artistId} artistName={artistName} />;
}

function AppContent() {
  const { user, loading } = useUserLogin();
  const { websiteSettings } = useApiData();
  const { isNavbarOpen } = useNavbar();
  
  // Update favicon dynamically when websiteSettings change
  React.useEffect(() => {
    if (websiteSettings?.favicon_url) {
      // Find existing favicon link or create new one
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteSettings.favicon_url;
    }
  }, [websiteSettings]);
  
  // Helper to check admin claim
  // const isAdmin = user && user.getIdTokenResult && user.email && user.getIdTokenResult;

  // Custom AdminDashboard route protection
  function AdminDashboardRoute() {
    const [isAdminUser, setIsAdminUser] = React.useState(null);
    const [checking, setChecking] = React.useState(true);
    const location = window.location;
    
    React.useEffect(() => {
      let mounted = true;
      async function checkAdmin() {
        setChecking(true);
        if (user && user.getIdTokenResult) {
          const tokenResult = await user.getIdTokenResult();
          if (mounted) setIsAdminUser(tokenResult.claims.admin === true);
        } else {
          if (mounted) setIsAdminUser(false);
        }
        setChecking(false);
      }
      checkAdmin();
      return () => { mounted = false; };
    }, [user]);
    
    if (loading || checking || isAdminUser === null) return null;
    if (!user || !isAdminUser) return <Navigate to="/" replace />;
    
    // Route to appropriate admin component
    if (location.pathname === '/admin/newsletter') {
      return <NewsletterCampaigns />;
    }
    if (location.pathname === '/admin/faq') {
      return <FaqManagement />;
    }
    
    return <AdminDashboard />;
  }

  return (
    
      <Router>
       
        <div 
          className="main-class min-h-screen flex flex-col relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000'
          }}
        >
          <ScrollToTop />
          <Toaster />
          
          {/* <NavBar /> */}
          <div className="flex w-full ">
          <ResponsiveNavbar />
          </div>
         
          <main className={`flex-1 pt-[4rem] lg:pt-[3rem] xl:pt-[3rem] ${isNavbarOpen ? (user ? 'sm:pt-[35rem] md:pt-[30rem]' : 'sm:pt-[35rem] md:pt-[35rem]') : 'sm:pt-[4rem] md:pt-[4rem] ' } transition-all duration-300`}>
          
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/store" element={<Store />} /> */}
            <Route path="/store" element={<ArtistStore />} />
            <Route path="/store/:artistId" element={<ArtistStoreWrapper />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/download" element={<SecureDownload />} />
            <Route path="/music" element={<Music />} />
            <Route path="/artists" element={<ArtistPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support-ministry" element={<SupportMinistry />} />
            <Route path="/donation-confirmation" element={<DonationConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/artist/:id" element={<ArtistOverview />} />
            <Route path="/artist/:artist-name/:id" element={<ArtistOverview />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/theme-demo" element={<ThemeDemo />} /> {/* Theme settings demo */}
            <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login route */}
            <Route path="/admin/dashboard" element={<AdminDashboardRoute />} /> {/* Protected admin dashboard route */}
            <Route path="/admin/newsletter" element={<AdminDashboardRoute />} /> {/* Protected newsletter campaigns route */}
            <Route path="/admin/faq" element={<AdminDashboardRoute />} /> {/* Protected FAQ management route */}
            
            {/* 404 Catch-all route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
       
    </Router>
   
  );
}

function App() {
  return (
    <NavbarProvider>
      <AppContent />
    </NavbarProvider>
  );
}

export default App;
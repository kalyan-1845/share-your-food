import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import AllNGOS from "./pages/AllNGOS";
import NGOPage from "./pages/NGOPage";
import FoodDetails from "./pages/FoodDetails";
import CategorySelection from "./pages/CategorySelection";
import ChooseRole from "./pages/ChooseYourRole";
import DeliverSelection from "./pages/DeliverSelection";
import DonationSelection from "./pages/DonationSelection";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup";
import FirstPage from "./pages/FirstPage";
import ConfirmFoodDetails from "./pages/ConfirmFoodDetails";

import { AuthProvider, useAuth } from "./context/AuthContext";
import mockService from "./services/mockService";

function AppContent() {
  const { user, loading } = useAuth();
  const [ngoData, setData] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const [foodData, setFoodData] = useState({ type: "", meal: "", quantity: 0 });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const fetchData = async () => {
      const data = await mockService.getNgos();
      setData(data);
    };
    fetchData();

    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Initializing Seva...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Install App Popup */}
      {deferredPrompt && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#4CAF50', color: 'white', padding: '12px 24px', fontWeight: 'bold',
          borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px'
        }} onClick={handleInstallClick}>
          <span>Install Seva App 📱</span>
        </div>
      )}
      <Switch>
        {/* Auth Guarded Routes */}
        {!user ? (
          <Route path="/">
            {isLoad ? <FirstPage /> : <Signup />}
          </Route>
        ) : (
          <>
            <Route exact path="/">
              <HomePage data={ngoData} />
            </Route>

            <Route exact path="/profile">
              <Profile user={user} />
            </Route>

            <Route path="/category" exact>
              <CategorySelection />
            </Route>

            <Route path="/all" exact>
              <AllNGOS data={ngoData} />
            </Route>

            <Route path="/all/:id" exact>
              <NGOPage data={ngoData} />
            </Route>

            <Route path="/foodDetails" exact>
              <FoodDetails handleInput={handleInput} />
            </Route>

            <Route path="/delivery" exact>
              <DeliverSelection />
            </Route>

            <Route path="/chooseRole" exact>
              <ChooseRole />
            </Route>

            <Route path="/donationType" exact>
              <DonationSelection />
            </Route>

            <Route path="/confirmFoodDetails" exact>
              <ConfirmFoodDetails foodData={foodData} />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

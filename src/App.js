import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import "./styles.css";
import Recyclable from "./Recyclable.tsx";
import Achievements from "./Achievements.tsx";
import NoPage from "./NoPage.tsx";
import IdentifyWaste from "./IdentifyWaste.tsx";
import MapPage from "./MapPage.tsx";
import PlantRecommendation from "./PlantRecommendation.tsx";
import CompostRatioCalculator from "./CompostRatioCalculator.tsx";
import CompostingTips from "./CompostingTips.tsx";
import WastePrediction from './WastePrediction.tsx';
import SearchPage from "./SearchPage.tsx";
import Camera from "./Camera.tsx"; 
import Quiz from "./QuizPage.tsx";
import PreventWaste from "./PreventWaste.tsx";
import PrivacyPolicy from "./PrivacyPolicy.tsx";
import TermsOfService from "./TermsOfService.tsx";
import ProductVideo from "./ProductVideo.tsx";

export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
 
            <Route path="/recyclable" element={<Recyclable />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/IdentifyWaste" element={<IdentifyWaste />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="/PlantRecommendation" element = {<PlantRecommendation />} />
            <Route path="/CompostRatioCalculator" element = {<CompostRatioCalculator />} />
            <Route path="/CompostingTips" element = {<CompostingTips />} />
            <Route path="/PreventWaste" element = {<PreventWaste />} />
            <Route path="/WastePrediction" element = {<WastePrediction />} />
            <Route path="/Camera" element={<Camera />} />
            <Route path="/Quiz" element={<Quiz/>}/>
            <Route path="/SearchPage" element = {<SearchPage />} />
            <Route path="/PrivacyPolicy" element = {<PrivacyPolicy/>}/>
            <Route path="/TermsOfService" element = {<TermsOfService/>}/>
            <Route path="/ProductVideo" element = {<ProductVideo/>}/>

          
           
            <Route path="*" element={<NoPage />} />{" "}
            {/* Handles undefined routes */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

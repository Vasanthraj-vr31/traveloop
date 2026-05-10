import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MyTripsPage from './pages/MyTripsPage';
import CreateTripPage from './pages/CreateTripPage';
import ItineraryBuilderPage from './pages/ItineraryBuilderPage';
import ItineraryViewPage from './pages/ItineraryViewPage';
import CitySearchPage from './pages/CitySearchPage';
import ActivitySearchPage from './pages/ActivitySearchPage';
import BudgetPage from './pages/BudgetPage';
import PackingPage from './pages/PackingPage';
import NotesPage from './pages/NotesPage';
import PhotosPage from './pages/PhotosPage';
import AISummaryPage from './pages/AISummaryPage';
import PDFSouvenirPage from './pages/PDFSouvenirPage';
import MapViewPage from './pages/MapViewPage';
import TripReplayPage from './pages/TripReplayPage';
import SharedTripPage from './pages/SharedTripPage';
import QRSharePage from './pages/QRSharePage';
import CollaborationPage from './pages/CollaborationPage';
import WeatherPage from './pages/WeatherPage';
import EmergencyPage from './pages/EmergencyPage';
import OfflinePage from './pages/OfflinePage';
import StatsPage from './pages/StatsPage';
import AdminPage from './pages/AdminPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* App with sidebar layout */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Trip Management */}
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/create-trip" element={<CreateTripPage />} />

          {/* Itinerary */}
          <Route path="/itinerary-builder" element={<ItineraryBuilderPage />} />
          <Route path="/itinerary-view" element={<ItineraryViewPage />} />

          {/* Discovery */}
          <Route path="/city-search" element={<CitySearchPage />} />
          <Route path="/activity-search" element={<ActivitySearchPage />} />

          {/* Finance */}
          <Route path="/budget" element={<BudgetPage />} />

          {/* Travel Tools */}
          <Route path="/packing" element={<PackingPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />

          {/* Content & Memory */}
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/ai-summary" element={<AISummaryPage />} />
          <Route path="/pdf-souvenir" element={<PDFSouvenirPage />} />

          {/* Visualization */}
          <Route path="/map-view" element={<MapViewPage />} />
          <Route path="/trip-replay" element={<TripReplayPage />} />

          {/* Social */}
          <Route path="/shared-trip" element={<SharedTripPage />} />
          <Route path="/qr-share" element={<QRSharePage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />

          {/* Engagement */}
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/offline" element={<OfflinePage />} />

          {/* Account */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

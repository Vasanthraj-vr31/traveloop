import React, { createContext, useContext, useState, useEffect } from 'react';
import { tripAPI, stopAPI, activityAPI, budgetAPI, packingAPI, noteAPI, photoAPI, authAPI } from '../services/api';
import { toast } from 'react-toastify';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [activities, setActivities] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [notes, setNotes] = useState([]);
  const [budget, setBudget] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch all trips on mount if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
      fetchTrips();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await authAPI.getProfile();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const { data } = await tripAPI.getAll();
      setTrips(data);
      if (data.length > 0 && !currentTrip) {
        setCurrentTrip(data[0]);
        fetchAllTripData(data[0]._id);
      }
    } catch (error) {
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTripData = async (tripId) => {
    try {
      const [itineraryRes, activitiesRes, packingRes, notesRes, budgetRes, photosRes] = await Promise.all([
        stopAPI.getByTrip(tripId),
        activityAPI.getByTrip(tripId),
        packingAPI.getByTrip(tripId),
        noteAPI.getByTrip(tripId),
        budgetAPI.getByTrip(tripId),
        photoAPI.getByTrip(tripId)
      ]);
      setItinerary(itineraryRes.data);
      setActivities(activitiesRes.data);
      setPackingList(packingRes.data);
      setNotes(notesRes.data);
      setBudget(budgetRes.data);
      setPhotos(photosRes.data);
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  const addTrip = async (tripData) => {
    try {
      const { data } = await tripAPI.create(tripData);
      setTrips([data, ...trips]);
      setCurrentTrip(data);
      fetchAllTripData(data._id);
      toast.success('🎉 Your journey has been archived.', {
        style: { background: '#F7F5EF', borderRadius: '40px', color: '#1F241D', border: '1px solid #CBD3C7', fontWeight: 'bold' }
      });
      return data;

    } catch (error) {
      toast.error('Failed to create trip');
      throw error;
    }
  };

  const updateTripData = async (id, updatedData) => {
    try {
      const { data } = await tripAPI.update(id, updatedData);
      setTrips(trips.map(t => t._id === id ? data : t));
      if (currentTrip?._id === id) setCurrentTrip(data);
      toast.success('Trip updated!');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const deleteTripData = async (id) => {
    try {
      await tripAPI.delete(id);
      setTrips(trips.filter(t => t._id !== id));
      if (currentTrip?._id === id) setCurrentTrip(trips[0] || null);
      toast.success('Trip deleted');
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const selectTrip = (trip) => {
    setCurrentTrip(trip);
    if (trip) fetchAllTripData(trip._id);
  };

  const refreshCurrentTrip = () => {
    if (currentTrip) fetchAllTripData(currentTrip._id);
  };

  return (
    <TripContext.Provider value={{
      trips, addTrip, updateTrip: updateTripData, deleteTrip: deleteTripData,
      currentTrip, setCurrentTrip, selectTrip,
      itinerary, setItinerary,
      activities, setActivities,
      packingList, setPackingList,
      notes, setNotes,
      budget, setBudget,
      photos, setPhotos,
      loading, fetchTrips, refreshCurrentTrip,
      user, fetchUser
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrips must be used within a TripProvider');
  return context;
};

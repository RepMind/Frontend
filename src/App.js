import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './components/sidebar';

import StartPage from './startPage';
import HomePage from './HomePage';
import LogWorkout from './logWorkoutPage';
import SettingsPage from './settingsPage';
import GoalsPage from './goalsPage';

// Layout wrapper for pages with sidebar
function SidebarLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* spacing below the top of the drawer */}
        <Outlet />   {/* Nested routes render here */}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Pages without sidebar */}
      <Route path="/" element={<StartPage />} />

      {/* Pages with sidebar */}
      <Route element={<SidebarLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/log-workout" element={<LogWorkout />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Route>
    </Routes>
  );
}

/**
 * API Configuration
 * 
 * In a split deployment (e.g., Frontend on Vercel, Backend on Render):
 * - VITE_API_URL should be set to your Render backend URL (e.g., https://your-app.onrender.com)
 * 
 * In a unified deployment (Backend serves Frontend):
 * - It defaults to the current window origin.
 */
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  
  // Fallback for development and unified production
  return "";
};

export const API_BASE_URL = getApiBaseUrl();

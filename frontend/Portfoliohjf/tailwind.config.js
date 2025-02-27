/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      yellow:'#ffcf11',
      black:'#1e2427',
      white:'#FFFFFF',
      grey:"#000004",
      red:"#E9040E",
    },
    boxShadow:{
      white:'2px 2px 2px 2px rgba(255, 255, 255,0.9)',
      '3d': '4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.6)', // Dual-layer shadow for 3D effect
        '3d-deep': '6px 6px 15px rgba(0, 0, 0, 0.3), -6px -6px 15px rgba(255, 255, 255, 0.5)', // Stronger effect
        '3d-glow': '4px 4px 10px rgba(0, 0, 255, 0.4), -4px -4px 10px rgba(255, 255, 0, 0.4)', // Colorful 3D glow
    },
   
    extend: {
     
    },
  },
  plugins: [],
}


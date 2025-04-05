/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3B82F6",          // blue-500
          "primary-focus": "#2563EB",    // blue-600
          "primary-content": "#ffffff",  // white
          
          "secondary": "#4F46E5",        // indigo-600
          "secondary-focus": "#4338CA",  // indigo-700
          "secondary-content": "#ffffff",// white
          
          "accent": "#0EA5E9",           // sky-500
          "accent-focus": "#0284C7",     // sky-600
          "accent-content": "#ffffff",   // white
          
          "neutral": "#2A303C",
          "neutral-focus": "#1d232f",
          "neutral-content": "#ffffff",
          
          "base-100": "#ffffff",
          "base-200": "#F9FAFB",
          "base-300": "#E5E7EB",
          "base-content": "#1f2937",
          
          "info": "#38BDF8",             // sky-400
          "success": "#22C55E",          // green-500
          "warning": "#F59E0B",          // amber-500
          "error": "#EF4444",            // red-500
        },
      },
    ],
  },
};

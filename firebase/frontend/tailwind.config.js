/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050816",
          card: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.12)",
          primary: "#00E5FF",
          secondary: "#6C63FF",
          accent: "#00C896",
          danger: "#FF4D6D",
          warning: "#FFB703",
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glow-purple': '0 0 25px rgba(108, 99, 255, 0.35)',
        'glow-red': '0 0 25px rgba(255, 77, 109, 0.4)',
        'glow-green': '0 0 25px rgba(0, 200, 150, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}

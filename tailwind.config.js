/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Bricolage Grotesque has real personality at display sizes -- slightly
        // odd proportions that stay charming rather than generic when set at
        // 15vw. Swap this one line to restyle the whole site's voice.
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'none' },
        },
        nudge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) both',
        nudge: 'nudge 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

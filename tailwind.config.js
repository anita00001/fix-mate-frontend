/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: '#98bf11',
      },
      margin: {
        '-48': '-48px',
      },
      width: {
        128: '40rem',
      },
      height: {
        128: '40rem',
      },
    },
  },
  plugins: [],
};

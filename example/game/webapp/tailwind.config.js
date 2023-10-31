import daisyui from 'daisyui';
import defaultTheme from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.stories.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...defaultTheme["[data-theme=dark]"],
          "primary": "#1d4ed8",
        },
      },
    ],
  },
}

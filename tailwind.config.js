/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      transparent: 'transparent',
      'white': '#ffffff',
      'black':'#000112',
      'purple' :'#635fc7',
      'red': '#EA5555',
      "Charcoal":'#20212c',
      "Lavender":'#a8a4ff',
      "Light-Salmon-Pink":'#ff9898',
      'Light-Blue-Gray':'#f4f7fd',
      'Powder-Blue':'#eaebfa',
      'Slate-Blue':'#828fa3',
      'Charcoal-Blue':'#3e3f4e',
      'Dark-Charcoal-Gray':'#2b2c37'


    },
    fontSize: {
      xs: ["12px", "15px"],
      sm: ["13px", "23px"],
      lg: ["15px", "19px"],
      xl: ["18px", "23px"],
      "2xl": ["24px", "30px"],
    },
    extend: {},
    screens:{
      'lg': {'max': '905px'},
      'sm': {'max': '639px'},

    }
  },

  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
};

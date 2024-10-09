import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  safelist: [
    {
      pattern: /bg-+/, // 👈  This includes bg of all colors and shades
    },
    'bg-[#f87171]',
    'bg-[#fca5a5]',
    'bg-[#fecaca]',
    'bg-[#a7f3d0]',
    'bg-[#6ee7b7]',
    'bg-[#6ee7b7]',
    'bg-[#6ee7b7]',
    'bg-[#6ee7b7]',
    'bg-[#6ee7b7]',
    'bg-[#6ee7b7]',
    'bg-[#34d399]',
    'bg-[#10b981]',
    'bg-[#059669]',
    'bg-[#047857]',
    'bg-[#065f46]',
    'bg-[#64748b]',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
      // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1280px",
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        "vtd-primary": colors.sky,
        "vtd-secondary": colors.gray,
        // primary: colors.indigo,
        secondary: colors.stone,
        success: colors.green,
        warning: colors.amber,
        // danger: colors.red,
        primary: {
          50: "#F6F8FF",
          100: "#EDF0FF",
          200: "#D1DAFE",
          300: "#B4C2FD",
          400: "#8092FF",
          500: "#4669fa",
          600: "#3F5EDF",
          700: "#2A3F96",
          800: "#203071",
          900: "#151F49",
        },
        danger: {
          50: "#FFF7F7",
          100: "#FEEFEF",
          200: "#FCD6D7",
          300: "#FABBBD",
          400: "#F68B8D",
          500: "#F1595C",
          600: "#D75052",
          700: "#913638",
          800: "#6D292A",
          900: "#461A1B",
        },
        black: {
          50: "#F9FAFB",
          100: "#F4F5F7",
          200: "#E5E7EB",
          300: "#D2D6DC",
          400: "#9FA6B2",
          500: "#111112",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // warning: {
        //   50: "#FFFAF8",
        //   100: "#FFF4F1",
        //   200: "#FEE4DA",
        //   300: "#FDD2C3",
        //   400: "#FCB298",
        //   500: "#FA916B",
        //   600: "#DF8260",
        //   700: "#965741",
        //   800: "#714231",
        //   900: "#492B20",
        // },
        info: {
          50: "#F3FEFF",
          100: "#E7FEFF",
          200: "#C5FDFF",
          300: "#A3FCFF",
          400: "#5FF9FF",
          500: "#0CE7FA",
          600: "#00B8D4",
          700: "#007A8D",
          800: "#005E67",
          900: "#003F42",
        },
        // success: {
        //   50: "#F3FEF8",
        //   100: "#E7FDF1",
        //   200: "#C5FBE3",
        //   300: "#A3F9D5",
        //   400: "#5FF5B1",
        //   500: "#50C793",
        //   600: "#3F9A7A",
        //   700: "#2E6D61",
        //   800: "#1F4B47",
        //   900: "#0F2A2E",
        // },

        gray: {
          50: "#F9FAFB",
          100: "#F4F5F7",
          200: "#E5E7EB",
          300: "#D2D6DC",
          400: "#9FA6B2",
          500: "#68768A",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        limeCyan: {
          50: "#f4fbf9",
          100: "#d9f3ea",
          200: "#b3e8d5",
          300: "#8cdcc0",
          400: "#66d0ab",
          500: "#3fc495",
          600: "#37b388",
          700: "#319f79",
          800: "#2b8b6a",
          900: "#25775a",
          950: "#1f634b",
        },
        softOrange: {
          50: "#fffaf9",
          100: "#feefea",
          200: "#fcdfd5",
          300: "#fbcfc0",
          400: "#f9bfab",
          500: "#f8b097",
          600: "#f59271",
          700: "#f3754c",
          800: "#f05927",
          900: "#df4310",
          950: "#ba380d",
        },
        desaturatedCyan: {
          50: "#f7fafb",
          100: "#e4eef1",
          200: "#c8dee2",
          300: "#adcdd4",
          400: "#91bdc5",
          500: "#77acb7",
          600: "#62a0ac",
          700: "#53919e",
          800: "#497f8a",
          900: "#3e6d76",
          950: "#345b63",
        },

        light: "#425466",
        "gray-f7": "#F7F8FC",
        dark: "#1E293B",
        "dark-gray": "#0F172A",
        gray2: "#EEF1F9",
        gray3: "#FAFBFF",
        "dark-light": "#CBD5E1",


        // 'black-2': '#010101',
        body: '#64748B',
        bodydark: '#AEB7C0',
        bodydark1: '#DEE4EE',
        bodydark2: '#8A99AF',
        // primary: '#3C50E0',
        // secondary: '#80CAEE',
        stroke: '#E2E8F0',
        graydark: '#333A48',
        // 'gray-2': '#F7F9FC',
        // 'gray-3': '#FAFAFA',
        whiten: '#F1F5F9',
        // whiter: '#F5F7FD',
        boxdark: '#24303F',
        'boxdark-2': '#1A222C',
        strokedark: '#2E3A47',
        'form-strokedark': '#3d4d60',
        // 'form-input': '#1d2a39',
        'meta-1': '#DC3545',
        'meta-2': '#EFF2F7',
        'meta-3': '#10B981',
        'meta-4': '#313D4A',
        'meta-5': '#259AE6',
        'meta-6': '#FFBA00',
        'meta-7': '#FF6766',
        'meta-8': '#F0950C',
        'meta-9': '#E5E7EB',
        'meta-10': '#0FADCF',
        'meta-11': '#FFFF00',
        // success: '#219653',
        // danger: '#D34053',
        // warning: '#FFA70B',

      },
      fontSize: {
        'title-xxl': ['44px', '55px'],
        'title-xxl2': ['42px', '58px'],
        'title-xl': ['36px', '45px'],
        'title-xl2': ['33px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
        'title-sm': ['20px', '26px'],
        'title-sm2': ['22px', '28px'],
        'title-xsm': ['18px', '24px']
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        11: '2.75rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        14.5: '3.625rem',
        15: '3.75rem',
        15.5: '3.875rem',
        16: '4rem',
        16.5: '4.125rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        18.5: '4.625rem',
        19: '4.75rem',
        19.5: '4.875rem',
        21: '5.25rem',
        21.5: '5.375rem',
        22: '5.5rem',
        22.5: '5.625rem',
        24.5: '6.125rem',
        25: '6.25rem',
        25.5: '6.375rem',
        26: '6.5rem',
        27: '6.75rem',
        27.5: '6.875rem',
        29: '7.25rem',
        29.5: '7.375rem',
        30: '7.5rem',
        31: '7.75rem',
        32.5: '8.125rem',
        33: '8.25rem',
        34: '8.5rem',
        34.5: '8.625rem',
        35: '8.75rem',
        36.5: '9.125rem',
        37.5: '9.375rem',
        39: '9.75rem',
        39.5: '9.875rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        46: '11.5rem',
        47.5: '11.875rem',
        49: '12.25rem',
        50: '12.5rem',
        52: '13rem',
        52.5: '13.125rem',
        54: '13.5rem',
        54.5: '13.625rem',
        55: '13.75rem',
        55.5: '13.875rem',
        59: '14.75rem',
        60: '15rem',
        62.5: '15.625rem',
        65: '16.25rem',
        67: '16.75rem',
        67.5: '16.875rem',
        70: '17.5rem',
        72.5: '18.125rem',
        73: '18.25rem',
        75: '18.75rem',
        90: '22.5rem',
        94: '23.5rem',
        95: '23.75rem',
        100: '25rem',
        115: '28.75rem',
        125: '31.25rem',
        132.5: '33.125rem',
        150: '37.5rem',
        171.5: '42.875rem',
        180: '45rem',
        187.5: '46.875rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem'
      },
      maxWidth: {
        2.5: '0.625rem',
        3: '0.75rem',
        4: '1rem',
        7: '1.75rem',
        9: '2.25rem',
        10: '2.5rem',
        10.5: '2.625rem',
        11: '2.75rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        22.5: '5.625rem',
        25: '6.25rem',
        30: '7.5rem',
        34: '8.5rem',
        35: '8.75rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        60: '15rem',
        70: '17.5rem',
        90: '22.5rem',
        94: '23.5rem',
        125: '31.25rem',
        132.5: '33.125rem',
        142.5: '35.625rem',
        150: '37.5rem',
        180: '45rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem',
        270: '67.5rem',
        280: '70rem',
        292.5: '73.125rem'
      },
      maxHeight: {
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
        550: '34.375rem',
        300: '18.75rem'
      },
      minWidth: {
        22.5: '5.625rem',
        42.5: '10.625rem',
        47.5: '11.875rem',
        75: '18.75rem'
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1'
      },
      opacity: {
        65: '.65'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9'
      },
      backgroundImage: {
        video: "url('../images/video/video.png')"
      },
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")'
      },
      transitionProperty: { width: 'width', stroke: 'stroke' },
      borderWidth: {
        6: '6px',
        10: '10px',
        12: '12px'
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
        9: '0px 2px 3px rgba(183, 183, 183, 0.5)'
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        4: '0px 0px 2px rgba(0, 0, 0, 0.2)',
        5: '0px 1px 5px rgba(0, 0, 0, 0.2)'
      },
      keyframes: {
        linspin: {
          '100%': { transform: 'rotate(360deg)' }
        },
        easespin: {
          '12.5%': { transform: 'rotate(135deg)' },
          '25%': { transform: 'rotate(270deg)' },
          '37.5%': { transform: 'rotate(405deg)' },
          '50%': { transform: 'rotate(540deg)' },
          '62.5%': { transform: 'rotate(675deg)' },
          '75%': { transform: 'rotate(810deg)' },
          '87.5%': { transform: 'rotate(945deg)' },
          '100%': { transform: 'rotate(1080deg)' }
        },
        'left-spin': {
          '0%': { transform: 'rotate(130deg)' },
          '50%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(130deg)' }
        },
        'right-spin': {
          '0%': { transform: 'rotate(-130deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(-130deg)' }
        },
        rotating: {
          '0%, 100%': { transform: 'rotate(360deg)' },
          '50%': { transform: 'rotate(0deg)' }
        },
        topbottom: {
          '0%, 100%': { transform: 'translate3d(0, -100%, 0)' },
          '50%': { transform: 'translate3d(0, 0, 0)' }
        },
        bottomtop: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -100%, 0)' }
        }
      },
      animation: {
        linspin: 'linspin 1568.2353ms linear infinite',
        easespin: 'easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'left-spin': 'left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'right-spin': 'right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
        rotating: 'rotating 30s linear infinite',
        topbottom: 'topbottom 60s infinite alternate linear',
        bottomtop: 'bottomtop 60s infinite alternate linear',
        'spin-1.5': 'spin 1.5s linear infinite',
        'spin-2': 'spin 2s linear infinite',
        'spin-3': 'spin 3s linear infinite'
      }
    }
  },
  plugins: [forms],
}
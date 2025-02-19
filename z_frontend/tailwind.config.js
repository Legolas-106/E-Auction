/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Font family extension
      fontFamily: {
        libre: ['Libre Franklin', 'sans-serif'],
      },

      // Font weights for specific elements (bold, light, thin)
      fontWeight: {
        light: 300,
        thin: 100,
        bold: 700,
      },

      // Font sizes (you can customize these as needed)
      fontSize: {
        '21': '21px',
        '32': '32px',
        '94': '94px',
      },

      // Line heights for specific elements
      lineHeight: {
        '21': '21px',
        '32': '32px',
        '94': '94px',
      },

      // Letter-spacing (tracking)
      letterSpacing: {
        '0': '0%',
      },

      // Custom colors (for the auction filter)
      colors: {
        grayCustom: '#B3B3B3',  // Custom gray color for bg
        customOrange: '#FE7008',      // Custom orange color for text in cards
      },

      // Custom spacing (margin, padding, etc.)
      spacing: {
        '40': '40px',
        '15': '15px',
        '30': '30px',
        '28': '28px',
        '166': '166px',
        '264': '264px',
        '364': '364px',
      },

      // Border radius (used for cards and buttons)
      borderRadius: {
        '500': '500px',
        '96': '96px',
        '2': '2px',
      },

      // Custom width values for cards and elements
      width: {
        '552': '552px',
        '264': '264px',
      },

      // Custom height values for elements like the custom header
      height: {
        '166': '166px',
        '204': '204px',
      },

      // Transition properties for smooth animations
      transitionProperty: {
        opacity: 'opacity',
        width: 'width',
        all: 'all',
      },

      // Duration for transitions (smooth fading effects)
      transitionDuration: {
        500: '500ms',
        300: '300ms',
      },

      // Custom z-index values (for hover states)
      zIndex: {
        '90': '90', // Used for sticky header
      },

      // Custom transforms
      rotate: {
        '90': '90deg',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".form-label": {
          "@apply text-lg font-medium text-gray-700 block text-left": "",
        },
        ".form-input": {
          "@apply mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500": "",
        },
        ".custom-header": {
          "@apply flex flex-col bg-[#7E5230] items-center justify-center w-full h-[166px] m-2 left-[38px] rounded-[500px] border-[1px] mr-[40px] ml-[40px] mb-[15px] pr-[40px] pl-[40px]": "",
        },
        ".auction-filter-grid-element":{
          "@apply border py-[28px] px-[40px] rounded-[96px] bg-grayCustom": "",
        },
        ".auction-filter-text": {
          "@apply font-libre font-[600] text-[21px] leading-[21px] tracking-[0] text-center": "",
        },
        ".auction-filter-text-div" : {
          "@apply h-full flex items-center justify-center" : "",
        },

        // Choose Us Div Card Styling

        ".chooseUs-custom-card": {
          "@apply flex flex-col justify-between relative w-[264px] h-[364px] bg-black rounded-[2px] p-[30px] transition-all duration-300 ease-in-out": "",
        },

        ".chooseUs-custom-card:hover": {
          "@apply w-[552px]": "",
        },

        ".chooseUs-custom-heading": {
          "@apply font-libre font-light text-[32px] leading-[32px] text-white text-center": "",
        },

        ".chooseUs-custom-text": {
          "@apply font-libre font-thin text-[32px] leading-[32px] text-white text-center": "",
        },

        ".chooseUs-custom-card-number": {
          "@apply flex justify-center items-center w-1/2 -rotate-90  font-libre font-bold text-[94px] leading-[94px] text-[#FE7008] opacity-100": "",
        },

        ".chooseUs-custom-card-number group-hover\\:hidden": {
          "@apply hidden": "",
        },

        ".chooseUs-custom-card:hover .chooseUs-custom-card-number": {
          "@apply hidden opacity-0 transition-opacity duration-500": "",
        },

        ".chooseUs-custom-card:hover .chooseUs-custom-text": {
          "@apply block opacity-100 transition-opacity duration-500": "",
        },

        ".chooseUs-custom-card-content": {
          "@apply hidden opacity-0 transition-opacity duration-500": "",
        },

        ".chooseUs-custom-card-content.group-hover\\:block": {
          "@apply block": "",
        },

        ".chooseUs-custom-card-content.group-hover\\:opacity-100": {
          "@apply opacity-100": "",
        },
      });
    },
  ],
}


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
       
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ghostwhite: "#f8faff",
         'rega-blue': '#605BFF',
        link: "#346bd4",
        "secondary-text": "#858585",
        white: "#fff",
        mediumslateblue: "#605bff",
        "field-color-darker": "#eaeaea",
        darkgray: "#999",
        black: "#000",
        background: "#f5f5f5",
        gray: "#fcfcff",
      },
      spacing: {},
      fontFamily: {
        lato: "Lato",
        montserrat: "Montserrat",
      },
      borderRadius: {
        "3xs": "10px",
        xl: "20px",
      },
    },
    fontSize: {
      base: "14px",
      xs: "12px",
      aboveBase: "16px",
      "17xl": "36px",
      "3xl": "20px",
      "10xl": "29px",
      "53xl": "72px",
      "24xl": "43px",
      "39xl": "58px",
      "40xl": "72px",
      "12xl": "24px",
      "13xl":"32px",
      inherit: "inherit",
    },
  },
 screens: {
        'smm': '480px',
      },
  corePlugins: {
    preflight: false,
  },
};
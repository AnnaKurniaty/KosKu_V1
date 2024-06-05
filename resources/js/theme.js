// black: {
//     100: "#d0d0d1",
//     200: "#a1a1a2",
//     300: "#717374",
//     400: "#424445",
//     500: "#131517",
//     600: "#0f1112",
//     700: "#0b0d0e",
//     800: "#080809",
//     900: "#040405"
// },
// blue
// 100: "#d3d4de",
// 200: "#a6a9be",
// 300: "#7a7f9d",
// 400: "#4d547d",
// 500: "#21295c",
// 600: "#191F45", // manually adjusted
// 700: "#141937",
// 800: "#0d1025",
// 900: "#070812",


//  // yellow
//  50: "#f0f0f0", // manually adjusted
//  100: "#fff6e0",
//  200: "#ffedc2",
//  300: "#ffe3a3",
//  400: "#ffda85",
//  500: "#ffd166",
//  600: "#cca752",
//  700: "#997d3d",
//  800: "#665429",
//  900: "#332a14",


// blue: {
//     100: "#e0eaff",
//     200: "#c1d5ff",
//     300: "#a3c1fe",
//     400: "#84acfe",
//     500: "#6597fe",
//     600: "#5179cb",
//     700: "#3d5b98",
//     800: "#283c66",
//     900: "#141e33"
// },

// red: {
//     100: "#f7dedf",
//     200: "#efbebf",
//     300: "#e89d9e",
//     400: "#e07d7e",
//     500: "#d85c5e",
//     600: "#ad4a4b",
//     700: "#823738",
//     800: "#562526",
//     900: "#2b1213"
// },

// orange: {
//     100: "#fdead1",
//     200: "#fad6a3",
//     300: "#f8c174",
//     400: "#f5ad46",
//     500: "#f39818",
//     600: "#c27a13",
//     700: "#925b0e",
//     800: "#613d0a",
//     900: "#311e05"
// },

// orange: {
//     100: "#ffe6d7",
//     200: "#fecdae",
//     300: "#feb486",
//     400: "#fd9b5d",
//     500: "#fd8235",
//     600: "#ca682a",
//     700: "#984e20",
//     800: "#653415",
//     900: "#331a0b"
// },

// teal: {
//     100: "#d1ecdf",
//     200: "#a3d9bf",
//     300: "#76c59f",
//     400: "#48b27f",
//     500: "#1a9f5f",
//     600: "#157f4c",
//     700: "#105f39",
//     800: "#0a4026",
//     900: "#052013"
// },



// color design tokens export
export const tokensDark = {
    grey: {
      0: "#69AC77", // manually adjusted
      10: "#f6f6f6", // manually adjusted
      50: "#f0f0f0", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", // manually adjusted
    },
    primary: {
      // black
      100: "#d0d0d1",
      200: "#a1a1a2",
      300: "#717374",
      400: "#424445",
      500: "#131517",
      600: "#0f1112",
      700: "#0b0d0e",
      800: "#080809",
      900: "#040405"
    },
    secondary: {
      // yellow
      100: "#d1ecdf",
      200: "#a3d9bf",
      300: "#76c59f",
      400: "#48b27f",
      500: "#1a9f5f",
      600: "#157f4c",
      700: "#105f39",
      800: "#0a4026",
      900: "#052013"

      // #6597FE
      // #D85C5E
      // #F39818
      // #FD8235
      // #17BB6A
      // #E13737
    },
  };
  
  // function that reverses the color palette
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.primary[600],
                alt: tokensDark.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.grey[0],
                alt: tokensDark.grey[50],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
export const config = {
  auth: {
    JWT: {
      ACCESS_TOKEN: "accessToken",
      REFRESH_TOKEN: "refreshToken"
    },
    REFRESHTOKENLIVETIME: 7 * 24 * 60 * 60
  },
  locale: {
    languages: {
      EN: "en",
      RU: "ru"
    }
  },
  theme: {
    modes: {
      DARK: "dark",
      LIGHT: "light"
    },
    tooltips: {
      DARK: "Switch to Light Mode",
      LIGHT: "Switch to Dark Mode"
    }
  }
} as const; 
# PocketWeather 🌦

A React Native weather app built with Expo. Search any city, get current conditions and a 7-day forecast. Powered by Open-Meteo, which needs **no API key**.

💻 **Code:** this repository · 📱 Runs in Expo Go

![Demo](./demo.gif)

## Features

- City search via the Open-Meteo geocoding API, with a result picker for ambiguous names
- Current weather: temperature, feels-like, wind, condition derived from WMO weather codes
- 7-day forecast with min/max temperatures and condition icons
- Full state cycle modelled as a discriminated union (`idle / searching / cities / loadingForecast / ready / error / noResults`), so impossible UI states don't compile
- Background tint changes with the current weather
- The API layer (`src/api`) is framework-free and could be shared with a web client unchanged

## Stack

React Native · Expo · TypeScript · Open-Meteo REST API

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (iOS/Android), or press `w` for the web version.

Web build for deployment:

```bash
npx expo export --platform web   # outputs to dist/
```

## What I learned

Modelling the screen as a single `Phase` discriminated union instead of separate booleans (`isLoading`, `hasError`, ...) removed a whole class of bugs: the compiler guarantees the forecast is only rendered when both a city and data exist. Styling with `StyleSheet` also made it clear how much of "CSS thinking" transfers to native layouts via flexbox.

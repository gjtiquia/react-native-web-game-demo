# React Native Web Game Demo

A demo project to test a game engine capable of running in both mobile and web using an Expo managed workflow while using React Native Skia as the graphics library.

## Instructions

### Setting up a Development Environment

Install all the required dependencies with the following command.

```bash
npm install
```

Start a development server with the following command.

```bash
npm start
```

Following the on-screen instructions, press "w" to open the app on the web.

To open the app on mobile, ensure your mobile has the Expo Go app installed and is connected to the same local network as the computer, then scan the QR code shown with the Expo Go app (Android) or the Camera App (iOS).

### Creating a Web App Build

Create a web app build with the following command.

```bash
npx expo export:web
```

This creates a production-ready static bundle in the web-build directory at the root of the project.

Serve the static bundle locally with the following command.

```bash
npx serve web-build
```

Follow the on-screen instructions to test locally how the app works in production.

Read [here](https://docs.expo.dev/distribution/publishing-websites/) for more documentation on creating web apps with Expo.

### Creating an Android APK Build with EAS Build

First follow the setup steps according to the [Expo documentation](https://docs.expo.dev/build/setup/).

Then run the following command

```bash
eas build -p android --profile development
```

## Developer Tools

Analyze, detect and debug circular dependencies with the following command.

```bash
npx skott --showCircularDependencies ./App.tsx
```

In the command above, App.tsx is used as the entrypoint. Read the [documentation](https://github.com/antoine-coulon/skott/tree/main/packages/skott#readme) for more information.

# Capacitor

## Set Up

Go to the frontend folder

```sh
npm i
```

to install all packages

```sh
npm run build
```

to build the **dist** file (that is the build file in react using vite)

```sh
npx cap sync [optionaly: platform: android or ios]
```

to sync the changes to the app project

now you can either

- open the editor (**Android Studio** or **xcode**)

OR

- run the command

```sh
npx cap open [platform: android or ios]
```

now the editor will open and you can run the project

## Changes

You should not change the app in the Editor of the Mobile App (so **Android Studio** or **Xcode**)

If you make changes you should make them in the root files (frontend or backend)

Do not change the android or the ios folder on your own, only by using the capacitor commands/cli

### Live Refresh

To use Live Reload, your device must be on the same Wi-Fi network as your development computer

To find local IP adress:

```sh
ipconfig
```

(diffrent on linux)

look for this section

```sh
Drahtlos-LAN-Adapter WLAN:

   Verbindungsspezifisches DNS-Suffix: lan
   Verbindungslokale IPv6-Adresse  . : fe80::8763:e704:1516:5f41%17
   IPv4-Adresse  . . . . . . . . . . : 192.168.96.171
   Subnetzmaske  . . . . . . . . . . : 255.255.240.0
   Standardgateway . . . . . . . . . : 192.168.96.1
```

and take the IPv4-Adresse `IPv4-Adresse  . . . . . . . . . . : 192.168.96.171`
and in the `capacitor.config.ts` modify your file like this

```ts
server:
      {
        url: "http://91.113.50.78:5173",
        cleartext: true,
      }

```

now you can use the server on your phone and have live refresh (so when changing UI, you see the changes live)

There are some changes you will not see on the live refresh, like .env file changes or chores changes (new packages, libaries, etc.), the main use of the live refresh is to see UI Changes and JS Functionality on your phone

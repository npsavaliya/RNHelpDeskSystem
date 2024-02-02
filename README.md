# Zealthy React Native Engineering Exercise

The coding exercise is to create a basic “help desk” / support system ticket
management system.
On the main page of the app, end users of the service should be able to submit support
ticket requests. Necessary fields include name, email, photo / attachment, and a
description of the problem they are experiencing.
On a separate page, the backend admin panel, support staff should be able to see a list
summary of each ticket, including status. They should be able to drill down into the
ticket and respond to a request, as well as update the status of the ticket. Possible
statuses are “new”, “in progress”, and “resolved”.
It is preferred that the front-end UI is implemented using React Native, with the backend
implemented in a language/framework of your choosing. This should work on both
Android and iOS.
Please deploy your completed exercise to the web somewhere (using Vercel or similar)
and include the demo URL when submitting your solution.
Note: For sake of time, the app does not need to send email. Please output via logging
instead, “Would normally send email here with body: ...”

# Requirements
### Time Requirements
There are no hard time requirements. Please take as much time as you need to do
your best work.

However, submitting this takehome is mandatory before we can consider your
application for the next phase.

### Tech Requirements
* You must use the existing infrastructure in every form. This means you must
  modify the existing source skeletons that exist, as they exist, but you are
  free to add packages to it to achieve your goals if needed. You just can't
  replace nextjs 13 with sveltekit, for example.
* All three packages in the monorepo should build without warning or error on
  the first try.
* There should be no lint or type errors reported from any monorepo packages.

### Important Information
* This is an NPM monorepo. You'll need to install dependencies in subdirectories
  as well as the root directory.
* The web portion can be started with `npm run start`. The mobile portion must
  be interfaced with through standard Expo commands,
  `cd packages/mobile` -> `npm run ios`.
* We have provided a seed script that will set up the database and add some
  default users: `npm run seed`.
    * `admin:admin`, `test:test`, and `user:password` are created in the seed
      script.

# Running Everything
Since this is an NPM monorepo, we omit the `packages/mobile` from the workspace
array to bypass the no-hoist issue. This means that you'll need to run `npm i`
in two places: the root directory and `packages/mobile`.

After that, you'll be able to spin up two consoles and run the following
commands:

1. `npm run start` in the root directory
2. `npx expo start` in `packages/mobile`

After that, everything should feel natural.

# Directory Structure
This is an NPM monorepo, so there are a few things to note:
1. The root directory contains the monorepo configuration.
2. You will also interface with `packages/back-end` to handle the help desk ticket
   management and user authentication.
3. `packages/back-end` contains the back-end. This is an expressjs project
   configured for javascript. The data is saved locally, the data will persist
   per session.
4. `packages/mobile` contains the mobile application. This is an Expo project
   scaffolded with `npm create expo -t expo-template-blank-typescript`.
   The mobile handles both client and support team UI/UX.
   client can see their ticket and create a new ticket
   support team can see the ticket of all users and respond to tickets by adding
   response and updating ticket status
   CLIENT credentials:
   Username: user
   Password: password
   
   Admin credentials:
   Username: admin
   Password: admin

# Configuration
If you test on the simulator, everything should work no problem through
localhost and you can skip this. However, if you want to test on a physical
device, there's some network-related config to do.

Thankfully, most of this can be done through env vars, with the one exception
being the back-end.

### `packages/mobile`:

You should overrite `.env.development` and `.env.local` and
set `EXPO_PUBLIC_API_BASE_URL` to include local IP of your node server, e.g.
`http://192.168.1.24:3000/`.

### `Windows Considerations`:
For Windows systems, depending on your firewall settings, you may need to allow
the ports you'll be using since network access will be through your router
rather than the loopback resolver.

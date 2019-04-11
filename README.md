# Why does this exist?

When I first started logging bike rides on Strava, I only had one bike so never bothered
setting that up and selecting it. Later on I got a new bike and started to populate the bike
field on each ride, but that left a lot of the earlier rides without the bike set.

Strava provides no way to bulk update activities in its UI, so I created this tool to do it for me.

# How to use it

First you'll need to [create a Strava app](https://www.strava.com/settings/api) - note down the Client ID and Client Secret. These must be populate in the `REACT_APP_CLIENT_ID` and `REACT_APP_CLIENT_SECRET` environment variables (You can to this by creating a `.env.local` file).

Next, install dependencies (I'm assuming you have Node.js and NPM installed):

`npm install`

And start the webapp:

`npm start`

This should open your default browser with the initial page of the app. Follow the prompts from here.

# Caveats

- The app will populate the bike field on any activity that does not have it set. Make sure any "exceptions" are set up beforehand.
- The Strava API has a rate limit. If you hit this, you'll just have to wait 15 minutes and start again. (Any activity that was previously edited won't be touched)

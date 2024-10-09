#Live
https://radiofy.onrender.com/

# Overview
This project is a radio website that can steam radio stations from around the world. It uses an open-source map called Leaflet to display the map and a custom API that I built in the backend to display radio data. The purpose of this app is to use it for myself as i'm a big house music fan and I found it challenging to find good radio websites withou bloat.

## Stack
The app is built using Node Js and Express in the backend, with PostgreSQL as the database. The front-end is a react app using Tailwind Css for styling.

# Challenges
Some challenges of this app were to find a good API to receive data for radio stations. After trying numerous free APIs I resorted to create my own and keep it simple with a json file in my backend. The limitations of this are that everything is added by me, but over time the number of stations will grow. 

Creating good state management was also a challenge in this app. The hardest part was creating good state management after the user logs in, since then he can favorite his stations. I used the react Context hook to manage state from the higher order component and let the bottom order components share that.

# How to run

# Backend
`npm start`

# Front End
`npm run dev`

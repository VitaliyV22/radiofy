
# Project Proposal: Radiofy

## Project Overview
**Project Name:** Radiofy  
**Objective:** To develop a user-friendly web application that allows users to discover, play, and manage their favorite radio stations through an interactive map interface. 

## Features

### Core Features
1. **User Authentication:**
   - Secure user login and registration with JWT and cookies.
   - Authentication state managed via context and local storage.

2. **Favorites Management:**
   - Users can add and remove radio stations from their favorites list.
   - A dedicated Favorites component displays the user’s saved stations.
   - Alerts for actions (e.g., adding/removing favorites).

3. **Interactive Map:**
   - Displays radio stations with markers using the React Leaflet library.
   - Users can click markers to see details and play stations.

4. **Audio Player:**
   - A custom audio player for streaming the selected radio station.
   - Controls for play/pause functionality and volume adjustment.
   - Displays the currently playing station's name and logo.

5. **Theme Support:**
   - Toggle between light and dark mode for enhanced user experience.

### Additional Features
- Responsive design for mobile and desktop users.
- Error handling and loading states for better user feedback.
- Integration with an external API to fetch radio station data.
- Real-time updates for the favorites list and audio player.

## Technology Stack
- **Frontend:**
  - React.js for building the user interface.
  - React Router for client-side routing.
  - Axios for HTTP requests.
  - Tailwind CSS and DaisyUI for styling and responsive design.
  - React Leaflet for interactive maps.
  - `react-hot-toast` for user notifications.

- **Backend:**
  - Node.js with Express for server-side development.
  - PostgreSQL hosted on Digital Ocean for data storage.
  - JWT for user authentication and authorization.


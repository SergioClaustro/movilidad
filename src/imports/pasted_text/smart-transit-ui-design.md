Design a modern, clean web application UI for a smart public transportation platform focused on real-time data and route optimization.

General style:

* Minimalist and intuitive UI
* Light theme
* Primary color: blue (#2563EB)
* Secondary color: green (#22C55E)
* Alert color: red (#EF4444)
* Background: light gray (#F5F5F5)
* Use a clean sans-serif font like Inter or Roboto
* Rounded corners and soft shadows
* Clear visual hierarchy
* Focus on usability and fast decision making
* Desktop-first design (1440px width), responsive-friendly

Layout structure:

* Top navigation bar
* Left sidebar (optional for navigation)
* Main content area split between map and information panels

Create the following web app screens:

1. Dashboard / Home (Main Screen)

* Top navbar with:

  * Logo (left)
  * Search bar (center) with placeholder: "Where are you going?"
  * User/profile icon (right)
* Main layout divided into:
  LEFT: Interactive map (takes ~70% width)
  RIGHT: Info panel (30%) with:

  * Nearest stops
  * Next arrivals (e.g. "Bus in 5 min")
  * Occupancy indicators (low/medium/high with colors)
* Optional left sidebar with:

  * Home
  * Routes
  * Favorites
  * Profile

2. Search / Route Planning

* Input fields:

  * Origin (default: current location)
  * Destination
* Suggestions dropdown:

  * Home
  * Work
  * Recent places
* Clean layout, centered or left-aligned form
* CTA button: "Search routes"

3. Routes Results Page

* Header with destination name
* List of route options displayed as cards (right panel or full page)
  Each card includes:

  * Estimated time (highlighted)
  * Transport types (icons: bus, train, walking)
  * Number of transfers
  * Occupancy level (color-coded)
* Map on the side showing route previews

4. Route Detail Page

* Large map with highlighted route
* Side panel with step-by-step instructions:

  * Walk, take bus, transfer, etc.
* Total travel time
* Clear visual separation between steps
* Emphasize readability

5. Real-time Tracking View

* Map with moving vehicle indicator
* Floating info card or side panel:

  * Arrival time (e.g. "3 min")
  * Occupancy level
* CTA button: "Follow route"
* Emphasize live updates visually

6. Profile / User Settings

* User avatar and basic info
* Sections:

  * Favorite routes
  * History
  * Preferences
  * Notifications
* Clean card-based layout

Design requirements:

* Use a consistent grid system (12-column layout)
* Maintain consistent spacing and alignment
* Use reusable UI components (cards, buttons, inputs, badges)
* Prioritize clarity of real-time data
* Avoid clutter, keep interface clean
* Use icons for transport types and statuses
* Ensure all pages feel cohesive as a single design system

Output a complete, consistent web UI design suitable for prototyping in Figma.
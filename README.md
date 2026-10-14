# EngageIQ — Social Media Engagement Rate Calculator

A responsive, browser-based college project built with HTML, CSS, and vanilla JavaScript. No database, server, API key, or package installation is required.

## Run the project
1. Download and extract `Social_Media_Engagement_Rate_Calculator.zip`.
2. Open the extracted folder.
3. Double-click `index.html` (or right-click it and open it in Chrome/Edge).
4. Start calculating. The **Try sample data** button demonstrates the app immediately.

## Features
- Modern responsive dashboard UI with dark-mode toggle.
- Instagram, TikTok, Facebook, YouTube, X, LinkedIn, and Other platform choices.
- Inputs for followers, likes, comments, shares, saves, and optional reach.
- Follower-based engagement rate and optional reach-based rate.
- Input validation and an easy-to-understand benchmark interpretation.
- Calculation history saved in browser localStorage.
- Delete one history row or clear all history.
- Export history to CSV for Excel.
- Metrics guide and formula explanation.
- Works offline after the first opening of the page, except web fonts which need internet. A local system font is used as a fallback.

## Formula
**Follower-based engagement rate (%)**  
`(Likes + Comments + Shares + Saves) / Followers × 100`

**Reach-based engagement rate (%)**  
`(Likes + Comments + Shares + Saves) / Reach × 100`

The displayed benchmark is intentionally a rough learning guide. A good engagement rate varies by platform, niche, audience, format, and campaign goal.

## Project structure
- `index.html` — page layout and sections
- `style.css` — responsive styling, cards, dashboard layout, dark mode
- `app.js` — calculations, validation, local history, CSV export
- `README.md` — setup and project guide

## Suggested college presentation
1. Problem statement: creators need a simple way to measure audience interaction.
2. Objective: calculate engagement rate and compare follower-based vs reach-based results.
3. Inputs: platform, follower count, likes, comments, shares, saves, optional reach.
4. Processing: validate numbers, calculate total interactions, apply the formula.
5. Outputs: rate, total interactions, interpretation, saved history, CSV.
6. Technology: HTML, CSS, JavaScript, localStorage, Blob-based CSV download.
7. Limitations: users enter metrics manually; no direct connection to social-media APIs.

## Notes
- This project does not sign in to social-media accounts or fetch live metrics. Enter figures from the platform's analytics page manually.
- History is saved only in the browser/device where the app is used. Clearing browser site data may remove it.
- If you want to publish it online, upload the folder contents to a static host such as GitHub Pages or Netlify.

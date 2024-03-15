# Neuron Assignment

# Link
https://data-webapp.vercel.app/

## Overview
The Neuron Assignment project is an application that aims to analyze data metrics with significant changes. It consists of a Python backend server responsible for reading data, detecting metrics with significant changes using confidence intervals, and providing this data to the frontend. The frontend, built with React, fetches the data from the backend and renders it for visualization.

## How it Works
### Backend Server:
- The Python backend server reads data from a file.
- It performs calculations to detect metrics with significant changes using confidence intervals.
- The server provides this processed data to the frontend upon request.

### Frontend:
- The React frontend fetches data from the backend server.
- It renders the fetched data, allowing users to view metrics with significant changes.
- The frontend provides visualization of the data through graphs and charts.

## Features
- **Data Analysis:** The backend server performs data analysis to detect metrics with significant changes.
- **Real-time Visualization:** The frontend provides real-time visualization of the analyzed data.
- **User Interaction:** Users can interact with the application to view and analyze metrics.

## Future Improvements
- **Real-time Data Integration:** Currently, the backend server reads data from a file, which limits the application to static data. Integrating real-time data sources would enhance the application's usefulness by providing up-to-date information.
- **Continuous Polling:** Implementing continuous polling from the backend server to the frontend would ensure that the data is always current, allowing for dynamic updates and real-time visualization.

## Technologies Used
- **Backend:** Python
- **Frontend:** React
- **Visualization:** React-Plotly.js


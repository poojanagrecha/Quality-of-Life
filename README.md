# Quality of Life Analysis

## Purpose

The purpose of our project was to visualize data pulled from an API in ways that allow for a given
user to explore different metrics and compare metrics between cities. The Teleport API gave us an
abundant list of cities including scores for the following: Housing, Cost of Living, Safety, Economy,
Education, Business Freedom, etc. Our data analysis we performed includes many charts to
visualize the scores in a meaningful way and help choose your perfect city.

## Data and Model

The data source we handled was the Teleport API. It is a database that focuses on the quality of life
for various cities around the world and pulls data from different sources such as the World Bank,
World Health Organization, United Nations, Without Borders, Air BnB, and more. 

## Chart Building

In order to build our visualizations, we used various javascript libraries - Jquery, D3, Leaflet, and
Plotly. We built four types of charts - a set of gauge charts made using Plotly, a radar chart made
using D3, a circular bar plot made using D3, and a cluster map made using Leaflet. The charts were
separated into two categories: charts by indicator and charts by city


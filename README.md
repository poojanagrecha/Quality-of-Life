# Quality of Life Analysis
![header](https://github.com/poojanagrecha/Quality-of-Life/blob/master/Images/Quality%20of%20Life.png)

<b> Deployed Link:</b> https://storage.googleapis.com/project2group1/project2-group1/index.html

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

![gaugechart](https://github.com/poojanagrecha/Quality-of-Life/blob/master/Images/gauge%20chart.png)

![circlechart](https://github.com/poojanagrecha/Quality-of-Life/blob/master/Images/circle%20chart.png)

![radarchart](https://github.com/poojanagrecha/Quality-of-Life/blob/master/Images/radar%20chart.png)

![leafletmap](https://github.com/poojanagrecha/Quality-of-Life/blob/master/Images/leaflet%20map.png)

## Data Takeaways
- Three highest scoring cities were Singapor, Munich, and Toronto
- US performed best in economic growth, startups, and education
- Cities in developing countries scored well in cost of living and housing
- Cities with high education scores have high scores in business free dome
- Eudcation, environmental quality and economy affect the housing and cost of living score and vice versa
- Cities with geographical feautrues such as mountains and beaches tend to score higher in outdoors as expected
- Major metropolitan cities scored high in Leisure and Culture






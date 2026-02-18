import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Train } from 'lucide-react';

// ============================================================
// PASTE YOUR LINES DATA HERE
// ============================================================
const lines = [
  {
    "id": "1",
    "color": "#EE352E",
    "stations": [
      { "id": 15, "name": "Van Cortlandt Park-242 St", "lat": 40.889248, "lng": -73.898583 },
      { "id": 4, "name": "238 St", "lat": 40.884667, "lng": -73.90087 },
      { "id": 36, "name": "231 St", "lat": 40.878856, "lng": -73.904834 },
      { "id": 25, "name": "Marble Hill-225 St", "lat": 40.874561, "lng": -73.909831 },
      { "id": 20, "name": "215 St", "lat": 40.869444, "lng": -73.915279 },
      { "id": 27, "name": "207 St", "lat": 40.864621, "lng": -73.918822 },
      { "id": 34, "name": "Dyckman St", "lat": 40.860531, "lng": -73.925536 },
      { "id": 3, "name": "191 St", "lat": 40.855225, "lng": -73.929412 },
      { "id": 12, "name": "181 St", "lat": 40.849505, "lng": -73.933596 },
      { "id": 19, "name": "168 St-Washington Hts", "lat": 40.840556, "lng": -73.940133 },
      { "id": 30, "name": "157 St", "lat": 40.834041, "lng": -73.94489 },
      { "id": 2, "name": "145 St", "lat": 40.826551, "lng": -73.95036 },
      { "id": 5, "name": "137 St-City College", "lat": 40.822008, "lng": -73.953676 },
      { "id": 32, "name": "125 St", "lat": 40.815581, "lng": -73.958372 },
      { "id": 17, "name": "116 St-Columbia University", "lat": 40.807722, "lng": -73.96411 },
      { "id": 9, "name": "Cathedral Pkwy (110 St)", "lat": 40.803967, "lng": -73.966847 },
      { "id": 7, "name": "103 St", "lat": 40.799446, "lng": -73.968379 },
      { "id": 38, "name": "96 St", "lat": 40.793919, "lng": -73.972323 },
      { "id": 26, "name": "86 St", "lat": 40.788644, "lng": -73.976218 },
      { "id": 16, "name": "79 St", "lat": 40.783934, "lng": -73.979917 },
      { "id": 11, "name": "72 St", "lat": 40.778453, "lng": -73.98197 },
      { "id": 23, "name": "66 St-Lincoln Center", "lat": 40.77344, "lng": -73.982209 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 37, "name": "50 St", "lat": 40.761728, "lng": -73.983849 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 10, "name": "34 St-Penn Station", "lat": 40.750373, "lng": -73.991057 },
      { "id": 18, "name": "28 St", "lat": 40.747215, "lng": -73.993365 },
      { "id": 29, "name": "23 St", "lat": 40.744081, "lng": -73.995657 },
      { "id": 14, "name": "18 St", "lat": 40.74104, "lng": -73.997871 },
      { "id": 8, "name": "14 St", "lat": 40.737826, "lng": -74.000201 },
      { "id": 31, "name": "Christopher St-Stonewall", "lat": 40.733422, "lng": -74.002906 },
      { "id": 22, "name": "Houston St", "lat": 40.728251, "lng": -74.005367 },
      { "id": 13, "name": "Canal St", "lat": 40.722854, "lng": -74.006277 },
      { "id": 6, "name": "Franklin St", "lat": 40.719318, "lng": -74.006886 },
      { "id": 35, "name": "Chambers St", "lat": 40.715478, "lng": -74.009266 },
      { "id": 24, "name": "WTC Cortlandt", "lat": 40.711835, "lng": -74.012188 },
      { "id": 21, "name": "Rector St", "lat": 40.707513, "lng": -74.013783 },
      { "id": 33, "name": "South Ferry", "lat": 40.702068, "lng": -74.013664 }
    ]
  },
  {
    "id": "2",
    "color": "#EE352E",
    "stations": [
      { "id": 49, "name": "Wakefield-241 St", "lat": 40.903125, "lng": -73.85062 },
      { "id": 50, "name": "Nereid Av", "lat": 40.898379, "lng": -73.854376 },
      { "id": 56, "name": "233 St", "lat": 40.893193, "lng": -73.857473 },
      { "id": 46, "name": "225 St", "lat": 40.884737, "lng": -73.862561 },
      { "id": 74, "name": "219 St", "lat": 40.883895, "lng": -73.862633 },
      { "id": 70, "name": "Gun Hill Rd", "lat": 40.87785, "lng": -73.866251 },
      { "id": 68, "name": "Burke Av", "lat": 40.871356, "lng": -73.867139 },
      { "id": 75, "name": "Allerton Av", "lat": 40.865462, "lng": -73.867352 },
      { "id": 52, "name": "Pelham Pkwy", "lat": 40.857192, "lng": -73.867615 },
      { "id": 64, "name": "Bronx Park East", "lat": 40.848828, "lng": -73.868357 },
      { "id": 41, "name": "E 180 St", "lat": 40.841894, "lng": -73.873561 },
      { "id": 71, "name": "West Farms Sq-East Tremont Av", "lat": 40.840295, "lng": -73.880049 },
      { "id": 51, "name": "174 St", "lat": 40.837288, "lng": -73.887734 },
      { "id": 65, "name": "Freeman St", "lat": 40.829993, "lng": -73.891865 },
      { "id": 62, "name": "Simpson St", "lat": 40.824073, "lng": -73.893064 },
      { "id": 42, "name": "Intervale Av", "lat": 40.822186, "lng": -73.896736 },
      { "id": 55, "name": "Prospect Av", "lat": 40.819585, "lng": -73.90177 },
      { "id": 43, "name": "Jackson Av", "lat": 40.81649, "lng": -73.907807 },
      { "id": 58, "name": "3 Av-149 St", "lat": 40.816109, "lng": -73.917743 },
      { "id": 72, "name": "149 St-Grand Concourse", "lat": 40.818375, "lng": -73.927351 },
      { "id": 32, "name": "125 St", "lat": 40.815581, "lng": -73.958372 },
      { "id": 73, "name": "116 St", "lat": 40.802098, "lng": -73.949625 },
      { "id": 63, "name": "Central Park North (110 St)", "lat": 40.799075, "lng": -73.951822 },
      { "id": 38, "name": "96 St", "lat": 40.793919, "lng": -73.972323 },
      { "id": 11, "name": "72 St", "lat": 40.778453, "lng": -73.98197 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 8, "name": "14 St", "lat": 40.737826, "lng": -74.000201 },
      { "id": 54, "name": "Christopher St-Stonewall", "lat": 40.733422, "lng": -74.002906 },
      { "id": 35, "name": "Chambers St", "lat": 40.715478, "lng": -74.009266 },
      { "id": 66, "name": "Park Place", "lat": 40.713057, "lng": -74.008351 },
      { "id": 76, "name": "Fulton St", "lat": 40.709416, "lng": -74.006571 },
      { "id": 67, "name": "Wall St", "lat": 40.706821, "lng": -74.0091 },
      { "id": 47, "name": "Borough Hall", "lat": 40.692338, "lng": -73.990151 },
      { "id": 39, "name": "Hoyt St", "lat": 40.690545, "lng": -73.985065 },
      { "id": 48, "name": "Nevins St", "lat": 40.683933, "lng": -73.982133 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 61, "name": "Franklin Av-Medgar Evers College", "lat": 40.670682, "lng": -73.958131 },
      { "id": 60, "name": "President St-Medgar Evers College", "lat": 40.667884, "lng": -73.950592 },
      { "id": 59, "name": "Sterling St", "lat": 40.662742, "lng": -73.95085 },
      { "id": 45, "name": "Winthrop St", "lat": 40.656653, "lng": -73.950234 },
      { "id": 44, "name": "Church Av", "lat": 40.650844, "lng": -73.949575 },
      { "id": 40, "name": "Beverly Rd", "lat": 40.645098, "lng": -73.948922 },
      { "id": 53, "name": "Newkirk Av-Little Haiti", "lat": 40.635081, "lng": -73.94836 },
      { "id": 57, "name": "Flatbush Av-Brooklyn College", "lat": 40.632391, "lng": -73.947614 }
    ]
  },
  {
    "id": "3",
    "color": "#EE352E",
    "stations": [
      { "id": 78, "name": "Harlem-148 St", "lat": 40.823541, "lng": -73.936526 },
      { "id": 84, "name": "145 St", "lat": 40.820421, "lng": -73.936245 },
      { "id": 32, "name": "125 St", "lat": 40.815581, "lng": -73.958372 },
      { "id": 73, "name": "116 St", "lat": 40.802098, "lng": -73.949625 },
      { "id": 63, "name": "Central Park North (110 St)", "lat": 40.799075, "lng": -73.951822 },
      { "id": 38, "name": "96 St", "lat": 40.793919, "lng": -73.972323 },
      { "id": 11, "name": "72 St", "lat": 40.778453, "lng": -73.98197 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 8, "name": "14 St", "lat": 40.737826, "lng": -74.000201 },
      { "id": 35, "name": "Chambers St", "lat": 40.715478, "lng": -74.009266 },
      { "id": 66, "name": "Park Place", "lat": 40.713057, "lng": -74.008351 },
      { "id": 76, "name": "Fulton St", "lat": 40.709416, "lng": -74.006571 },
      { "id": 67, "name": "Wall St", "lat": 40.706821, "lng": -74.0091 },
      { "id": 47, "name": "Borough Hall", "lat": 40.692338, "lng": -73.990151 },
      { "id": 39, "name": "Hoyt St", "lat": 40.690545, "lng": -73.985065 },
      { "id": 48, "name": "Nevins St", "lat": 40.683933, "lng": -73.982133 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 61, "name": "Franklin Av-Medgar Evers College", "lat": 40.670682, "lng": -73.958131 },
      { "id": 87, "name": "Nostrand Av", "lat": 40.669938, "lng": -73.950424 },
      { "id": 80, "name": "Kingston Av", "lat": 40.66952, "lng": -73.942161 },
      { "id": 88, "name": "Crown Hts-Utica Av", "lat": 40.667364, "lng": -73.930596 },
      { "id": 82, "name": "Sutter Av-Rutland Rd", "lat": 40.66414, "lng": -73.922612 },
      { "id": 85, "name": "Saratoga Av", "lat": 40.66414, "lng": -73.916325 },
      { "id": 86, "name": "Rockaway Av", "lat": 40.663514, "lng": -73.908831 },
      { "id": 77, "name": "Junius St", "lat": 40.663515, "lng": -73.902447 },
      { "id": 79, "name": "Pennsylvania Av", "lat": 40.664714, "lng": -73.894886 },
      { "id": 81, "name": "Van Siclen Av", "lat": 40.66542, "lng": -73.889393 },
      { "id": 83, "name": "New Lots Av", "lat": 40.666235, "lng": -73.884079 }
    ]
  },
  {
    "id": "4",
    "color": "#00933C",
    "stations": [
      { "id": 92, "name": "Woodlawn", "lat": 40.886037, "lng": -73.878751 },
      { "id": 101, "name": "Mosholu Pkwy", "lat": 40.879177, "lng": -73.884555 },
      { "id": 94, "name": "Bedford Park Blvd-Lehman College", "lat": 40.873244, "lng": -73.890064 },
      { "id": 91, "name": "Kingsbridge Rd", "lat": 40.866978, "lng": -73.893509 },
      { "id": 105, "name": "Fordham Rd", "lat": 40.862803, "lng": -73.89746 },
      { "id": 99, "name": "183 St", "lat": 40.858407, "lng": -73.903879 },
      { "id": 90, "name": "Burnside Av", "lat": 40.853197, "lng": -73.907722 },
      { "id": 93, "name": "176 St", "lat": 40.848839, "lng": -73.911794 },
      { "id": 104, "name": "Mt Eden Av", "lat": 40.844434, "lng": -73.914685 },
      { "id": 96, "name": "170 St", "lat": 40.839302, "lng": -73.917625 },
      { "id": 106, "name": "167 St", "lat": 40.833769, "lng": -73.921751 },
      { "id": 89, "name": "161 St-Yankee Stadium", "lat": 40.827905, "lng": -73.925651 },
      { "id": 72, "name": "149 St-Grand Concourse", "lat": 40.818375, "lng": -73.927351 },
      { "id": 108, "name": "125 St", "lat": 40.804138, "lng": -73.937594 },
      { "id": 97, "name": "86 St", "lat": 40.779492, "lng": -73.955589 },
      { "id": 98, "name": "59 St", "lat": 40.762526, "lng": -73.967967 },
      { "id": 100, "name": "42 St-Grand Central", "lat": 40.751776, "lng": -73.976848 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 103, "name": "Brooklyn Bridge-City Hall", "lat": 40.713065, "lng": -74.004131 },
      { "id": 76, "name": "Fulton St", "lat": 40.709416, "lng": -74.006571 },
      { "id": 107, "name": "Wall St", "lat": 40.707557, "lng": -74.010618 },
      { "id": 95, "name": "Bowling Green", "lat": 40.704817, "lng": -74.014065 },
      { "id": 47, "name": "Borough Hall", "lat": 40.692338, "lng": -73.990151 },
      { "id": 48, "name": "Nevins St", "lat": 40.683933, "lng": -73.982133 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 61, "name": "Franklin Av-Medgar Evers College", "lat": 40.670682, "lng": -73.958131 },
      { "id": 88, "name": "Crown Hts-Utica Av", "lat": 40.667364, "lng": -73.930596 }
    ]
  },
  {
    "id": "5",
    "color": "#00933C",
    "stations": [
      { "id": 113, "name": "Eastchester-Dyre Av", "lat": 40.889122, "lng": -73.830339 },
      { "id": 112, "name": "Dyre Av", "lat": 40.8883, "lng": -73.830834 },
      { "id": 111, "name": "Baychester Av", "lat": 40.878631, "lng": -73.838591 },
      { "id": 114, "name": "Gun Hill Rd", "lat": 40.869526, "lng": -73.846384 },
      { "id": 110, "name": "Pelham Pkwy", "lat": 40.858985, "lng": -73.855353 },
      { "id": 109, "name": "Morris Park", "lat": 40.854364, "lng": -73.860495 },
      { "id": 41, "name": "E 180 St", "lat": 40.841894, "lng": -73.873561 },
      { "id": 71, "name": "West Farms Sq-East Tremont Av", "lat": 40.840295, "lng": -73.880049 },
      { "id": 51, "name": "174 St", "lat": 40.837288, "lng": -73.887734 },
      { "id": 65, "name": "Freeman St", "lat": 40.829993, "lng": -73.891865 },
      { "id": 62, "name": "Simpson St", "lat": 40.824073, "lng": -73.893064 },
      { "id": 42, "name": "Intervale Av", "lat": 40.822186, "lng": -73.896736 },
      { "id": 55, "name": "Prospect Av", "lat": 40.819585, "lng": -73.90177 },
      { "id": 43, "name": "Jackson Av", "lat": 40.81649, "lng": -73.907807 },
      { "id": 58, "name": "3 Av-149 St", "lat": 40.816109, "lng": -73.917743 },
      { "id": 72, "name": "149 St-Grand Concourse", "lat": 40.818375, "lng": -73.927351 },
      { "id": 108, "name": "125 St", "lat": 40.804138, "lng": -73.937594 },
      { "id": 97, "name": "86 St", "lat": 40.779492, "lng": -73.955589 },
      { "id": 98, "name": "59 St", "lat": 40.762526, "lng": -73.967967 },
      { "id": 100, "name": "42 St-Grand Central", "lat": 40.751776, "lng": -73.976848 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 103, "name": "Brooklyn Bridge-City Hall", "lat": 40.713065, "lng": -74.004131 },
      { "id": 76, "name": "Fulton St", "lat": 40.709416, "lng": -74.006571 },
      { "id": 107, "name": "Wall St", "lat": 40.707557, "lng": -74.010618 },
      { "id": 95, "name": "Bowling Green", "lat": 40.704817, "lng": -74.014065 },
      { "id": 47, "name": "Borough Hall", "lat": 40.692338, "lng": -73.990151 },
      { "id": 48, "name": "Nevins St", "lat": 40.683933, "lng": -73.982133 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 61, "name": "Franklin Av-Medgar Evers College", "lat": 40.670682, "lng": -73.958131 },
      { "id": 60, "name": "President St-Medgar Evers College", "lat": 40.667884, "lng": -73.950592 },
      { "id": 59, "name": "Sterling St", "lat": 40.662742, "lng": -73.95085 },
      { "id": 45, "name": "Winthrop St", "lat": 40.656653, "lng": -73.950234 },
      { "id": 44, "name": "Church Av", "lat": 40.650844, "lng": -73.949575 },
      { "id": 53, "name": "Newkirk Av-Little Haiti", "lat": 40.635081, "lng": -73.94836 },
      { "id": 57, "name": "Flatbush Av-Brooklyn College", "lat": 40.632391, "lng": -73.947614 }
    ]
  },
  {
    "id": "6",
    "color": "#00933C",
    "stations": [
      { "id": 134, "name": "Pelham Bay Park", "lat": 40.852403, "lng": -73.828121 },
      { "id": 138, "name": "Buhre Av", "lat": 40.84681, "lng": -73.832569 },
      { "id": 118, "name": "Middletown Rd", "lat": 40.843863, "lng": -73.836322 },
      { "id": 143, "name": "Westchester Sq-East Tremont Av", "lat": 40.839892, "lng": -73.839849 },
      { "id": 122, "name": "Zerega Av", "lat": 40.839548, "lng": -73.847384 },
      { "id": 131, "name": "Castlehill Av", "lat": 40.835254, "lng": -73.854356 },
      { "id": 119, "name": "Parkchester", "lat": 40.833226, "lng": -73.860816 },
      { "id": 121, "name": "St Lawrence Av", "lat": 40.831504, "lng": -73.867618 },
      { "id": 129, "name": "Morrison Av-Soundview", "lat": 40.829521, "lng": -73.874451 },
      { "id": 124, "name": "Elder Av", "lat": 40.82858, "lng": -73.879159 },
      { "id": 116, "name": "Whitlock Av", "lat": 40.826525, "lng": -73.886283 },
      { "id": 136, "name": "Hunts Point Av", "lat": 40.820948, "lng": -73.890549 },
      { "id": 123, "name": "Longwood Av", "lat": 40.816104, "lng": -73.899615 },
      { "id": 130, "name": "East 143 St-St Mary's St", "lat": 40.808719, "lng": -73.907657 },
      { "id": 139, "name": "Cypress Av", "lat": 40.805368, "lng": -73.914042 },
      { "id": 132, "name": "Brook Av", "lat": 40.807566, "lng": -73.91924 },
      { "id": 144, "name": "3 Av-138 St", "lat": 40.810546, "lng": -73.926138 },
      { "id": 108, "name": "125 St", "lat": 40.804138, "lng": -73.937594 },
      { "id": 141, "name": "110 St", "lat": 40.79502, "lng": -73.94425 },
      { "id": 126, "name": "103 St", "lat": 40.7906, "lng": -73.947478 },
      { "id": 142, "name": "96 St", "lat": 40.785672, "lng": -73.95107 },
      { "id": 97, "name": "86 St", "lat": 40.779492, "lng": -73.955589 },
      { "id": 128, "name": "77 St", "lat": 40.77362, "lng": -73.959874 },
      { "id": 140, "name": "68 St-Hunter College", "lat": 40.768141, "lng": -73.96387 },
      { "id": 98, "name": "59 St", "lat": 40.762526, "lng": -73.967967 },
      { "id": 145, "name": "67 St", "lat": 40.768141, "lng": -73.96387 },
      { "id": 120, "name": "33 St", "lat": 40.744565, "lng": -73.982023 },
      { "id": 125, "name": "28 St", "lat": 40.743077, "lng": -73.984264 },
      { "id": 127, "name": "23 St", "lat": 40.739864, "lng": -73.986599 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 137, "name": "Astor Pl", "lat": 40.730054, "lng": -73.99107 },
      { "id": 117, "name": "Bleecker St", "lat": 40.725915, "lng": -73.994659 },
      { "id": 135, "name": "Spring St", "lat": 40.722301, "lng": -73.997141 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 103, "name": "Brooklyn Bridge-City Hall", "lat": 40.713065, "lng": -74.004131 }
    ]
  },
  {
    "id": "7",
    "color": "#B933AD",
    "stations": [
      { "id": 149, "name": "Flushing-Main St", "lat": 40.7596, "lng": -73.83003 },
      { "id": 155, "name": "Mets-Willets Point", "lat": 40.754645, "lng": -73.845625 },
      { "id": 157, "name": "111 St", "lat": 40.751735, "lng": -73.855334 },
      { "id": 165, "name": "103 St-Corona Plaza", "lat": 40.749865, "lng": -73.8627 },
      { "id": 158, "name": "Junction Blvd", "lat": 40.749145, "lng": -73.869527 },
      { "id": 163, "name": "90 St-Elmhurst Av", "lat": 40.748375, "lng": -73.876571 },
      { "id": 162, "name": "82 St-Jackson Hts", "lat": 40.747659, "lng": -73.883697 },
      { "id": 151, "name": "Jackson Hts-Roosevelt Av", "lat": 40.746644, "lng": -73.891338 },
      { "id": 152, "name": "69 St", "lat": 40.746325, "lng": -73.896402 },
      { "id": 159, "name": "Woodside-61 St", "lat": 40.74563, "lng": -73.902984 },
      { "id": 147, "name": "52 St", "lat": 40.744149, "lng": -73.912549 },
      { "id": 148, "name": "46 St-Bliss St", "lat": 40.743304, "lng": -73.918413 },
      { "id": 154, "name": "40 St-Lowery St", "lat": 40.743781, "lng": -73.924016 },
      { "id": 150, "name": "33 St-Rawson St", "lat": 40.744577, "lng": -73.930997 },
      { "id": 164, "name": "Queensboro Plaza", "lat": 40.750582, "lng": -73.940247 },
      { "id": 156, "name": "Court Sq", "lat": 40.746554, "lng": -73.943932 },
      { "id": 153, "name": "Hunters Point Av", "lat": 40.742216, "lng": -73.948766 },
      { "id": 160, "name": "Vernon Blvd-Jackson Av", "lat": 40.742626, "lng": -73.953581 },
      { "id": 100, "name": "42 St-Grand Central", "lat": 40.751776, "lng": -73.976848 },
      { "id": 161, "name": "5th Av", "lat": 40.753821, "lng": -73.98193 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 146, "name": "34 St-Hudson Yards", "lat": 40.755882, "lng": -74.00191 }
    ]
  },
  {
    "id": "A",
    "color": "#0039A6",
    "stations": [
      { "id": 208, "name": "Inwood-207 St", "lat": 40.868072, "lng": -73.919899 },
      { "id": 209, "name": "Dyckman St", "lat": 40.865491, "lng": -73.927271 },
      { "id": 205, "name": "190 St", "lat": 40.859022, "lng": -73.93418 },
      { "id": 221, "name": "181 St", "lat": 40.851695, "lng": -73.937996 },
      { "id": 217, "name": "175 St", "lat": 40.844454, "lng": -73.936371 },
      { "id": 19, "name": "168 St-Washington Hts", "lat": 40.840556, "lng": -73.940133 },
      { "id": 32, "name": "125 St", "lat": 40.811109, "lng": -73.952731 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 225, "name": "42 St-Port Authority Bus Terminal", "lat": 40.757308, "lng": -73.989735 },
      { "id": 224, "name": "Avenue of the Americas (6 Av) & W 4 St", "lat": 40.732338, "lng": -74.000495 },
      { "id": 171, "name": "Canal St", "lat": 40.720824, "lng": -74.005229 },
      { "id": 35, "name": "Chambers St", "lat": 40.714111, "lng": -74.008585 },
      { "id": 76, "name": "Fulton St", "lat": 40.710324, "lng": -74.007581 },
      { "id": 203, "name": "High St", "lat": 40.699337, "lng": -73.990531 },
      { "id": 169, "name": "Jay St-MetroTech", "lat": 40.692331, "lng": -73.987342 },
      { "id": 186, "name": "Hoyt-Schermerhorn Sts", "lat": 40.688484, "lng": -73.985001 },
      { "id": 216, "name": "Nostrand Av", "lat": 40.68045, "lng": -73.950451 },
      { "id": 199, "name": "Utica Av", "lat": 40.679364, "lng": -73.931142 },
      { "id": 212, "name": "Broadway Junction", "lat": 40.678963, "lng": -73.903258 },
      { "id": 170, "name": "Euclid Av", "lat": 40.675302, "lng": -73.881342 },
      { "id": 179, "name": "Grant Av", "lat": 40.677044, "lng": -73.865125 },
      { "id": 184, "name": "80 St", "lat": 40.679371, "lng": -73.858992 },
      { "id": 182, "name": "88 St", "lat": 40.679843, "lng": -73.85147 },
      { "id": 213, "name": "Rockaway Blvd", "lat": 40.680429, "lng": -73.843853 },
      { "id": 194, "name": "111 St", "lat": 40.684331, "lng": -73.832163 },
      { "id": 188, "name": "104 St", "lat": 40.681711, "lng": -73.831393 },
      { "id": 189, "name": "Ozone Park-Lefferts Blvd", "lat": 40.685951, "lng": -73.825798 },
      { "id": 175, "name": "Aqueduct-N Conduit Av", "lat": 40.668234, "lng": -73.834058 },
      { "id": 211, "name": "Howard Beach-JFK Airport", "lat": 40.660476, "lng": -73.830301 },
      { "id": 197, "name": "Broad Channel", "lat": 40.608386, "lng": -73.815925 },
      { "id": 185, "name": "Far Rockaway-Mott Av", "lat": 40.603995, "lng": -73.755405 },
      { "id": 202, "name": "Rockaway Park-Beach 116 St", "lat": 40.580903, "lng": -73.835592 }
    ]
  },
  {
    "id": "B",
    "color": "#FF6319",
    "stations": [
      { "id": 252, "name": "Norwood-205 St", "lat": 40.877229, "lng": -73.879121 },
      { "id": 238, "name": "Bedford Park Blvd", "lat": 40.873244, "lng": -73.890064 },
      { "id": 236, "name": "Kingsbridge Rd", "lat": 40.866978, "lng": -73.893509 },
      { "id": 247, "name": "Fordham Rd", "lat": 40.861296, "lng": -73.897749 },
      { "id": 246, "name": "182-183 Sts", "lat": 40.856093, "lng": -73.900741 },
      { "id": 235, "name": "Tremont Av", "lat": 40.85056, "lng": -73.905281 },
      { "id": 248, "name": "174-175 Sts", "lat": 40.8459, "lng": -73.910136 },
      { "id": 245, "name": "170 St", "lat": 40.839302, "lng": -73.917625 },
      { "id": 244, "name": "167 St", "lat": 40.833769, "lng": -73.921751 },
      { "id": 241, "name": "161 St-Yankee Stadium", "lat": 40.827905, "lng": -73.925651 },
      { "id": 229, "name": "Grand Concourse", "lat": 40.824368, "lng": -73.923838 },
      { "id": 32, "name": "125 St", "lat": 40.811109, "lng": -73.952731 },
      { "id": 207, "name": "116 St", "lat": 40.805085, "lng": -73.954077 },
      { "id": 239, "name": "Cathedral Pkwy (110 St)", "lat": 40.800366, "lng": -73.958061 },
      { "id": 200, "name": "86 St", "lat": 40.785001, "lng": -73.968916 },
      { "id": 196, "name": "81 St-Museum of Natural History", "lat": 40.781433, "lng": -73.973275 },
      { "id": 206, "name": "72 St", "lat": 40.775519, "lng": -73.976461 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 253, "name": "7th Av", "lat": 40.762862, "lng": -73.981637 },
      { "id": 249, "name": "47-50 Sts-Rockefeller Ctr", "lat": 40.758663, "lng": -73.981329 },
      { "id": 261, "name": "42 St-Bryant Pk", "lat": 40.754222, "lng": -73.984569 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 251, "name": "23 St", "lat": 40.742877, "lng": -73.992821 },
      { "id": 174, "name": "W 4 St-Wash Sq", "lat": 40.732338, "lng": -74.000495 },
      { "id": 230, "name": "Broadway-Lafayette St", "lat": 40.725297, "lng": -73.996204 },
      { "id": 231, "name": "DeKalb Av", "lat": 40.690635, "lng": -73.981824 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 228, "name": "7th Av", "lat": 40.67705, "lng": -73.972624 },
      { "id": 243, "name": "Prospect Park", "lat": 40.660742, "lng": -73.961334 },
      { "id": 259, "name": "Church Av", "lat": 40.650527, "lng": -73.962982 },
      { "id": 227, "name": "Newkirk Plaza", "lat": 40.635082, "lng": -73.962793 },
      { "id": 240, "name": "Kings Hwy", "lat": 40.603258, "lng": -73.963408 },
      { "id": 250, "name": "Sheepshead Bay", "lat": 40.586896, "lng": -73.954155 },
      { "id": 237, "name": "Brighton Beach", "lat": 40.577621, "lng": -73.961376 }
    ]
  },
  {
    "id": "C",
    "color": "#0039A6",
    "stations": [
      { "id": 19, "name": "168 St-Washington Hts", "lat": 40.840556, "lng": -73.940133 },
      { "id": 135, "name": "163 St-Amsterdam Av", "lat": 40.836022, "lng": -73.939849 },
      { "id": 263, "name": "155 St", "lat": 40.830518, "lng": -73.941514 },
      { "id": 264, "name": "135 St", "lat": 40.817894, "lng": -73.947649 },
      { "id": 32, "name": "125 St", "lat": 40.811109, "lng": -73.952731 },
      { "id": 207, "name": "116 St", "lat": 40.805085, "lng": -73.954077 },
      { "id": 223, "name": "Cathedral Pkwy (110 St)", "lat": 40.800366, "lng": -73.958061 },
      { "id": 200, "name": "86 St", "lat": 40.785001, "lng": -73.968916 },
      { "id": 196, "name": "81 St-Museum of Natural History", "lat": 40.781433, "lng": -73.973275 },
      { "id": 206, "name": "72 St", "lat": 40.775519, "lng": -73.976461 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 262, "name": "50 St", "lat": 40.762456, "lng": -73.985931 },
      { "id": 225, "name": "42 St-Port Authority Bus Terminal", "lat": 40.757308, "lng": -73.989735 },
      { "id": 224, "name": "Avenue of the Americas (6 Av) & W 4 St", "lat": 40.732338, "lng": -74.000495 },
      { "id": 181, "name": "14 St", "lat": 40.740893, "lng": -74.00169 },
      { "id": 174, "name": "W 4 St-Wash Sq", "lat": 40.732338, "lng": -74.000495 },
      { "id": 177, "name": "Spring St", "lat": 40.726227, "lng": -74.003719 },
      { "id": 171, "name": "Canal St", "lat": 40.720824, "lng": -74.005229 },
      { "id": 35, "name": "Chambers St", "lat": 40.714111, "lng": -74.008585 },
      { "id": 76, "name": "Fulton St", "lat": 40.710324, "lng": -74.007581 },
      { "id": 203, "name": "High St", "lat": 40.699337, "lng": -73.990531 },
      { "id": 169, "name": "Jay St-MetroTech", "lat": 40.692331, "lng": -73.987342 },
      { "id": 186, "name": "Hoyt-Schermerhorn Sts", "lat": 40.688484, "lng": -73.985001 },
      { "id": 218, "name": "Lafayette Av", "lat": 40.686143, "lng": -73.974214 },
      { "id": 183, "name": "Clinton-Washington Avs", "lat": 40.688089, "lng": -73.966839 },
      { "id": 214, "name": "Franklin Av", "lat": 40.68138, "lng": -73.955727 },
      { "id": 216, "name": "Nostrand Av", "lat": 40.68045, "lng": -73.950451 },
      { "id": 220, "name": "Kingston-Throop Avs", "lat": 40.679921, "lng": -73.940858 },
      { "id": 204, "name": "Ralph Av", "lat": 40.678822, "lng": -73.92074 },
      { "id": 212, "name": "Broadway Junction", "lat": 40.678963, "lng": -73.903258 },
      { "id": 176, "name": "Liberty Av", "lat": 40.674542, "lng": -73.88757 },
      { "id": 201, "name": "Van Siclen Av", "lat": 40.672803, "lng": -73.89146 },
      { "id": 191, "name": "Shepherd Av", "lat": 40.67413, "lng": -73.889755 },
      { "id": 170, "name": "Euclid Av", "lat": 40.675302, "lng": -73.881342 }
    ]
  },
  {
    "id": "D",
    "color": "#FF6319",
    "stations": [
      { "id": 271, "name": "Norwood-205 St", "lat": 40.877229, "lng": -73.879121 },
      { "id": 238, "name": "Bedford Park Blvd", "lat": 40.873244, "lng": -73.890064 },
      { "id": 236, "name": "Kingsbridge Rd", "lat": 40.866978, "lng": -73.893509 },
      { "id": 247, "name": "Fordham Rd", "lat": 40.861296, "lng": -73.897749 },
      { "id": 246, "name": "182-183 Sts", "lat": 40.856093, "lng": -73.900741 },
      { "id": 235, "name": "Tremont Av", "lat": 40.85056, "lng": -73.905281 },
      { "id": 248, "name": "174-175 Sts", "lat": 40.8459, "lng": -73.910136 },
      { "id": 245, "name": "170 St", "lat": 40.839302, "lng": -73.917625 },
      { "id": 244, "name": "167 St", "lat": 40.833769, "lng": -73.921751 },
      { "id": 241, "name": "161 St-Yankee Stadium", "lat": 40.827905, "lng": -73.925651 },
      { "id": 229, "name": "Grand Concourse", "lat": 40.824368, "lng": -73.923838 },
      { "id": 281, "name": "155 St", "lat": 40.830518, "lng": -73.941514 },
      { "id": 32, "name": "125 St", "lat": 40.811109, "lng": -73.952731 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 249, "name": "47-50 Sts-Rockefeller Ctr", "lat": 40.758663, "lng": -73.981329 },
      { "id": 261, "name": "42 St-Bryant Pk", "lat": 40.754222, "lng": -73.984569 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 174, "name": "W 4 St-Wash Sq", "lat": 40.732338, "lng": -74.000495 },
      { "id": 230, "name": "Broadway-Lafayette St", "lat": 40.725297, "lng": -73.996204 },
      { "id": 265, "name": "Grand St", "lat": 40.718267, "lng": -73.993753 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 270, "name": "9th Av", "lat": 40.646292, "lng": -73.994324 },
      { "id": 267, "name": "Fort Hamilton Pkwy", "lat": 40.631386, "lng": -73.995175 },
      { "id": 279, "name": "55 St", "lat": 40.631435, "lng": -73.995476 },
      { "id": 276, "name": "50 St", "lat": 40.636223, "lng": -73.994511 },
      { "id": 278, "name": "62 St", "lat": 40.624842, "lng": -73.996353 },
      { "id": 277, "name": "71 St", "lat": 40.619589, "lng": -73.998863 },
      { "id": 275, "name": "79 St", "lat": 40.613501, "lng": -73.99591 },
      { "id": 274, "name": "Bay Pkwy", "lat": 40.601815, "lng": -73.993728 },
      { "id": 269, "name": "18th Av", "lat": 40.607954, "lng": -73.997692 },
      { "id": 268, "name": "20th Av", "lat": 40.604557, "lng": -73.998148 },
      { "id": 273, "name": "25th Av", "lat": 40.597704, "lng": -73.986823 },
      { "id": 272, "name": "Bay 50 St", "lat": 40.588841, "lng": -73.983765 },
      { "id": 280, "name": "Coney Island-Stillwell Av", "lat": 40.577422, "lng": -73.981233 }
    ]
  },
  {
    "id": "E",
    "color": "#0039A6",
    "stations": [
      { "id": 289, "name": "Jamaica Center-Parsons/Archer", "lat": 40.702147, "lng": -73.8011 },
      { "id": 294, "name": "Sutphin Blvd-Archer Av-JFK Airport", "lat": 40.700486, "lng": -73.807979 },
      { "id": 288, "name": "Jamaica-Van Wyck", "lat": 40.702566, "lng": -73.816859 },
      { "id": 285, "name": "Briarwood", "lat": 40.709892, "lng": -73.82055 },
      { "id": 283, "name": "Kew Gardens-Union Tpke", "lat": 40.714441, "lng": -73.831008 },
      { "id": 287, "name": "75 Av", "lat": 40.718331, "lng": -73.837324 },
      { "id": 284, "name": "Forest Hills-71 Av", "lat": 40.721691, "lng": -73.844521 },
      { "id": 151, "name": "Jackson Hts-Roosevelt Av", "lat": 40.746644, "lng": -73.891338 },
      { "id": 291, "name": "Queens Plaza", "lat": 40.748973, "lng": -73.937243 },
      { "id": 156, "name": "Court Sq-23 St", "lat": 40.746554, "lng": -73.943932 },
      { "id": 292, "name": "Lexington Av/53 St", "lat": 40.757552, "lng": -73.969055 },
      { "id": 293, "name": "5th Av/53 St", "lat": 40.760167, "lng": -73.975224 },
      { "id": 295, "name": "7th Av", "lat": 40.762862, "lng": -73.981637 },
      { "id": 28, "name": "59 St-Columbus Circle", "lat": 40.768247, "lng": -73.981929 },
      { "id": 262, "name": "50 St", "lat": 40.762456, "lng": -73.985931 },
      { "id": 225, "name": "42 St-Port Authority Bus Terminal", "lat": 40.757308, "lng": -73.989735 },
      { "id": 296, "name": "34 St-Penn Station", "lat": 40.752287, "lng": -73.993391 },
      { "id": 178, "name": "23 St", "lat": 40.745906, "lng": -73.998041 },
      { "id": 181, "name": "14 St", "lat": 40.740893, "lng": -74.00169 },
      { "id": 174, "name": "W 4 St-Wash Sq", "lat": 40.732338, "lng": -74.000495 },
      { "id": 177, "name": "Spring St", "lat": 40.726227, "lng": -74.003719 },
      { "id": 171, "name": "Canal St", "lat": 40.720824, "lng": -74.005229 },
      { "id": 282, "name": "World Trade Center", "lat": 40.712582, "lng": -74.009781 }
    ]
  },
  {
    "id": "F",
    "color": "#FF6319",
    "stations": [
      { "id": 314, "name": "179 St-Jamaica", "lat": 40.712646, "lng": -73.78381 },
      { "id": 312, "name": "169 St", "lat": 40.71047, "lng": -73.793604 },
      { "id": 290, "name": "Parsons Blvd", "lat": 40.707565, "lng": -73.803326 },
      { "id": 317, "name": "Sutphin Blvd", "lat": 40.70546, "lng": -73.810708 },
      { "id": 285, "name": "Briarwood", "lat": 40.709892, "lng": -73.82055 },
      { "id": 302, "name": "Kew Gardens-Union Tpke", "lat": 40.714441, "lng": -73.831008 },
      { "id": 287, "name": "75 Av", "lat": 40.718331, "lng": -73.837324 },
      { "id": 284, "name": "Forest Hills-71 Av", "lat": 40.721691, "lng": -73.844521 },
      { "id": 286, "name": "67 Av", "lat": 40.726523, "lng": -73.852719 },
      { "id": 151, "name": "Jackson Hts-Roosevelt Av", "lat": 40.746644, "lng": -73.891338 },
      { "id": 327, "name": "21 St-Queensbridge", "lat": 40.754203, "lng": -73.942836 },
      { "id": 328, "name": "Roosevelt Island", "lat": 40.759145, "lng": -73.95326 },
      { "id": 313, "name": "63rd St-Lexington Av", "lat": 40.764629, "lng": -73.96609 },
      { "id": 326, "name": "57 St", "lat": 40.763972, "lng": -73.97745 },
      { "id": 249, "name": "47-50 Sts-Rockefeller Ctr", "lat": 40.758663, "lng": -73.981329 },
      { "id": 261, "name": "42 St-Bryant Pk", "lat": 40.754222, "lng": -73.984569 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 315, "name": "23 St", "lat": 40.742877, "lng": -73.992821 },
      { "id": 181, "name": "14 St", "lat": 40.740893, "lng": -74.00169 },
      { "id": 174, "name": "W 4 St-Wash Sq", "lat": 40.732338, "lng": -74.000495 },
      { "id": 230, "name": "Broadway-Lafayette St", "lat": 40.725297, "lng": -73.996204 },
      { "id": 303, "name": "2nd Av", "lat": 40.723402, "lng": -73.989938 },
      { "id": 304, "name": "Delancey St", "lat": 40.718611, "lng": -73.988114 },
      { "id": 297, "name": "East Broadway", "lat": 40.713715, "lng": -73.990173 },
      { "id": 299, "name": "York St", "lat": 40.701397, "lng": -73.986751 },
      { "id": 169, "name": "Jay St-MetroTech", "lat": 40.692331, "lng": -73.987342 },
      { "id": 324, "name": "Bergen St", "lat": 40.686145, "lng": -73.990756 },
      { "id": 323, "name": "Carroll St", "lat": 40.680303, "lng": -73.995048 },
      { "id": 321, "name": "4th Av-9th St", "lat": 40.670847, "lng": -73.988302 },
      { "id": 307, "name": "7th Av", "lat": 40.666271, "lng": -73.980305 },
      { "id": 325, "name": "15 St-Prospect Park", "lat": 40.660145, "lng": -73.979893 },
      { "id": 318, "name": "Fort Hamilton Pkwy", "lat": 40.650782, "lng": -73.975776 },
      { "id": 322, "name": "Church Av", "lat": 40.644041, "lng": -73.979678 },
      { "id": 308, "name": "Ditmas Av", "lat": 40.636119, "lng": -73.978172 },
      { "id": 301, "name": "18th Av", "lat": 40.621111, "lng": -73.974487 },
      { "id": 311, "name": "Avenue I", "lat": 40.625322, "lng": -73.974433 },
      { "id": 316, "name": "Bay Pkwy", "lat": 40.60142, "lng": -73.973715 },
      { "id": 298, "name": "Avenue N", "lat": 40.61514, "lng": -73.974197 },
      { "id": 309, "name": "Avenue P", "lat": 40.608775, "lng": -73.974052 },
      { "id": 319, "name": "Kings Hwy", "lat": 40.603258, "lng": -73.973347 },
      { "id": 305, "name": "Avenue U", "lat": 40.592105, "lng": -73.972985 },
      { "id": 320, "name": "Avenue X", "lat": 40.58962, "lng": -73.974223 },
      { "id": 300, "name": "Neptune Av", "lat": 40.580981, "lng": -73.974531 },
      { "id": 310, "name": "West 8 St-NY Aquarium", "lat": 40.576127, "lng": -73.975662 },
      { "id": 280, "name": "Coney Island-Stillwell Av", "lat": 40.577422, "lng": -73.981233 }
    ]
  },
  {
    "id": "G",
    "color": "#6CBE45",
    "stations": [
      { "id": 156, "name": "Court Sq", "lat": 40.746554, "lng": -73.943932 },
      { "id": 334, "name": "21 St", "lat": 40.744471, "lng": -73.948607 },
      { "id": 332, "name": "Greenpoint Av", "lat": 40.730323, "lng": -73.954634 },
      { "id": 333, "name": "Nassau Av", "lat": 40.724311, "lng": -73.951183 },
      { "id": 331, "name": "Metropolitan Av", "lat": 40.71111, "lng": -73.951503 },
      { "id": 335, "name": "Flushing Av", "lat": 40.70037, "lng": -73.945273 },
      { "id": 336, "name": "Myrtle-Willoughby Avs", "lat": 40.694568, "lng": -73.949046 },
      { "id": 329, "name": "Bedford-Nostrand Avs", "lat": 40.689627, "lng": -73.953522 },
      { "id": 339, "name": "Classon Av", "lat": 40.688877, "lng": -73.960019 },
      { "id": 330, "name": "Clinton-Washington Avs", "lat": 40.688089, "lng": -73.966839 },
      { "id": 338, "name": "Fulton St", "lat": 40.687119, "lng": -73.975375 },
      { "id": 186, "name": "Hoyt-Schermerhorn Sts", "lat": 40.688484, "lng": -73.985001 },
      { "id": 324, "name": "Bergen St", "lat": 40.686145, "lng": -73.990756 },
      { "id": 323, "name": "Carroll St", "lat": 40.680303, "lng": -73.995048 },
      { "id": 306, "name": "Smith-9th Sts", "lat": 40.67358, "lng": -73.995959 },
      { "id": 321, "name": "4th Av-9th St", "lat": 40.670847, "lng": -73.988302 },
      { "id": 307, "name": "7th Av", "lat": 40.666271, "lng": -73.980305 },
      { "id": 325, "name": "15 St-Prospect Park", "lat": 40.660145, "lng": -73.979893 },
      { "id": 322, "name": "Church Av", "lat": 40.644041, "lng": -73.979678 }
    ]
  },
  {
    "id": "J",
    "color": "#996633",
    "stations": [
      { "id": 289, "name": "Jamaica Center-Parsons/Archer", "lat": 40.702147, "lng": -73.8011 },
      { "id": 294, "name": "Sutphin Blvd-Archer Av-JFK Airport", "lat": 40.700486, "lng": -73.807979 },
      { "id": 363, "name": "121 St", "lat": 40.700579, "lng": -73.828294 },
      { "id": 362, "name": "111 St", "lat": 40.697485, "lng": -73.836303 },
      { "id": 353, "name": "104 St", "lat": 40.695178, "lng": -73.844335 },
      { "id": 345, "name": "Woodhaven Blvd", "lat": 40.693879, "lng": -73.851578 },
      { "id": 346, "name": "85 St-Forest Pkwy", "lat": 40.692435, "lng": -73.86001 },
      { "id": 344, "name": "75 St-Elderts Ln", "lat": 40.691324, "lng": -73.867135 },
      { "id": 359, "name": "Cyprus Hills", "lat": 40.689941, "lng": -73.87255 },
      { "id": 358, "name": "Crescent St", "lat": 40.683145, "lng": -73.873793 },
      { "id": 361, "name": "Norwood Av", "lat": 40.68141, "lng": -73.880039 },
      { "id": 349, "name": "Cleveland St", "lat": 40.679947, "lng": -73.884739 },
      { "id": 356, "name": "Van Siclen Av", "lat": 40.678024, "lng": -73.891688 },
      { "id": 340, "name": "Alabama Av", "lat": 40.676992, "lng": -73.898406 },
      { "id": 212, "name": "Broadway Junction", "lat": 40.678963, "lng": -73.903258 },
      { "id": 360, "name": "Chauncey St", "lat": 40.682893, "lng": -73.910456 },
      { "id": 350, "name": "Halsey St", "lat": 40.68637, "lng": -73.916559 },
      { "id": 351, "name": "Gates Av", "lat": 40.68963, "lng": -73.92223 },
      { "id": 355, "name": "Kosciuszko St", "lat": 40.693154, "lng": -73.928781 },
      { "id": 342, "name": "Myrtle Av", "lat": 40.697207, "lng": -73.935657 },
      { "id": 354, "name": "Flushing Av", "lat": 40.70037, "lng": -73.945273 },
      { "id": 357, "name": "Lorimer St", "lat": 40.703862, "lng": -73.947408 },
      { "id": 341, "name": "Hewes St", "lat": 40.70687, "lng": -73.95354 },
      { "id": 352, "name": "Marcy Av", "lat": 40.708359, "lng": -73.957757 },
      { "id": 343, "name": "Essex St", "lat": 40.718315, "lng": -73.988691 },
      { "id": 348, "name": "Bowery", "lat": 40.72028, "lng": -73.993915 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 347, "name": "Chambers St", "lat": 40.713243, "lng": -74.003401 },
      { "id": 76, "name": "Fulton St", "lat": 40.710368, "lng": -74.009509 },
      { "id": 195, "name": "Broad St", "lat": 40.706471, "lng": -74.011056 }
    ]
  },
  {
    "id": "L",
    "color": "#A7A9AC",
    "stations": [
      { "id": 373, "name": "8 Av", "lat": 40.739777, "lng": -74.002578 },
      { "id": 379, "name": "6th Av", "lat": 40.737335, "lng": -73.996786 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 380, "name": "3rd Av", "lat": 40.732849, "lng": -73.986122 },
      { "id": 371, "name": "1st Av", "lat": 40.730953, "lng": -73.981628 },
      { "id": 365, "name": "Bedford Av", "lat": 40.717304, "lng": -73.956872 },
      { "id": 385, "name": "Lorimer St", "lat": 40.714072, "lng": -73.948939 },
      { "id": 367, "name": "Graham Av", "lat": 40.714565, "lng": -73.944053 },
      { "id": 368, "name": "Grand St", "lat": 40.711926, "lng": -73.94028 },
      { "id": 376, "name": "Montrose Av", "lat": 40.706537, "lng": -73.94425 },
      { "id": 374, "name": "Morgan Av", "lat": 40.704139, "lng": -73.933159 },
      { "id": 369, "name": "Jefferson St", "lat": 40.706607, "lng": -73.922913 },
      { "id": 382, "name": "DeKalb Av", "lat": 40.703811, "lng": -73.918425 },
      { "id": 384, "name": "Myrtle-Wyckoff Avs", "lat": 40.699814, "lng": -73.911586 },
      { "id": 372, "name": "Halsey St", "lat": 40.695602, "lng": -73.912086 },
      { "id": 364, "name": "Wilson Av", "lat": 40.688764, "lng": -73.904046 },
      { "id": 366, "name": "Bushwick Av-Aberdeen St", "lat": 40.682829, "lng": -73.905249 },
      { "id": 212, "name": "Broadway Junction", "lat": 40.678963, "lng": -73.903258 },
      { "id": 383, "name": "Atlantic Av", "lat": 40.675345, "lng": -73.903088 },
      { "id": 375, "name": "Sutter Av", "lat": 40.669367, "lng": -73.901975 },
      { "id": 378, "name": "Livonia Av", "lat": 40.664038, "lng": -73.900571 },
      { "id": 377, "name": "New Lots Av", "lat": 40.662742, "lng": -73.899617 },
      { "id": 381, "name": "East 105 St", "lat": 40.650573, "lng": -73.901006 },
      { "id": 370, "name": "Canarsie-Rockaway Pkwy", "lat": 40.646064, "lng": -73.90204 }
    ]
  },
  {
    "id": "M",
    "color": "#FF6319",
    "stations": [
      { "id": 386, "name": "Middle Village-Metropolitan Av", "lat": 40.711396, "lng": -73.889601 },
      { "id": 389, "name": "Fresh Pond Rd", "lat": 40.706186, "lng": -73.895877 },
      { "id": 387, "name": "Forest Av", "lat": 40.704423, "lng": -73.903077 },
      { "id": 400, "name": "Seneca Av", "lat": 40.702762, "lng": -73.907724 },
      { "id": 384, "name": "Myrtle-Wyckoff Avs", "lat": 40.699814, "lng": -73.911586 },
      { "id": 388, "name": "Knickerbocker Av", "lat": 40.698664, "lng": -73.919711 },
      { "id": 401, "name": "Central Av", "lat": 40.697703, "lng": -73.927385 },
      { "id": 342, "name": "Myrtle Av", "lat": 40.697207, "lng": -73.935657 },
      { "id": 354, "name": "Flushing Av", "lat": 40.70037, "lng": -73.945273 },
      { "id": 357, "name": "Lorimer St", "lat": 40.703862, "lng": -73.947408 },
      { "id": 341, "name": "Hewes St", "lat": 40.70687, "lng": -73.95354 },
      { "id": 352, "name": "Marcy Av", "lat": 40.708359, "lng": -73.957757 },
      { "id": 343, "name": "Essex St", "lat": 40.718315, "lng": -73.988691 },
      { "id": 348, "name": "Bowery", "lat": 40.72028, "lng": -73.993915 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 347, "name": "Chambers St", "lat": 40.713243, "lng": -74.003401 },
      { "id": 76, "name": "Fulton St", "lat": 40.710368, "lng": -74.009509 },
      { "id": 195, "name": "Broad St", "lat": 40.706471, "lng": -74.011056 }
    ]
  },
  {
    "id": "N",
    "color": "#FCCC0A",
    "stations": [
      { "id": 412, "name": "Astoria-Ditmars Blvd", "lat": 40.775036, "lng": -73.912034 },
      { "id": 411, "name": "Astoria Blvd", "lat": 40.770258, "lng": -73.917843 },
      { "id": 405, "name": "30 Av", "lat": 40.766779, "lng": -73.921479 },
      { "id": 415, "name": "Broadway", "lat": 40.76182, "lng": -73.925508 },
      { "id": 416, "name": "36 Av", "lat": 40.75589, "lng": -73.927364 },
      { "id": 164, "name": "Queensboro Plaza", "lat": 40.750582, "lng": -73.940247 },
      { "id": 421, "name": "Lexington Av/59 St", "lat": 40.76266, "lng": -73.967258 },
      { "id": 420, "name": "5th Av-59 St", "lat": 40.764811, "lng": -73.973347 },
      { "id": 423, "name": "57 St-7 Av", "lat": 40.764664, "lng": -73.980658 },
      { "id": 422, "name": "49 St", "lat": 40.759835, "lng": -73.984139 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 23, "name": "28 St", "lat": 40.745494, "lng": -73.988691 },
      { "id": 29, "name": "23 St", "lat": 40.741303, "lng": -73.989344 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 419, "name": "8 St-NYU", "lat": 40.730328, "lng": -73.992629 },
      { "id": 404, "name": "Prince St", "lat": 40.724329, "lng": -73.997702 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 231, "name": "DeKalb Av", "lat": 40.690635, "lng": -73.981824 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 402, "name": "36 St", "lat": 40.648629, "lng": -74.00303 },
      { "id": 413, "name": "59 St", "lat": 40.641362, "lng": -74.017881 },
      { "id": 408, "name": "8th Av", "lat": 40.635068, "lng": -74.011719 },
      { "id": 407, "name": "Fort Hamilton Pkwy", "lat": 40.631386, "lng": -73.995175 },
      { "id": 406, "name": "New Utrecht Av", "lat": 40.624842, "lng": -73.996353 },
      { "id": 418, "name": "Bay Pkwy", "lat": 40.601815, "lng": -73.993728 },
      { "id": 410, "name": "18th Av", "lat": 40.607954, "lng": -73.997692 },
      { "id": 409, "name": "20th Av", "lat": 40.604557, "lng": -73.998148 },
      { "id": 414, "name": "Kings Hwy", "lat": 40.59393, "lng": -73.980651 },
      { "id": 425, "name": "Avenue U", "lat": 40.592508, "lng": -73.979047 },
      { "id": 417, "name": "86 St", "lat": 40.591246, "lng": -73.978506 },
      { "id": 280, "name": "Coney Island-Stillwell Av", "lat": 40.577422, "lng": -73.981233 }
    ]
  },
  {
    "id": "Q",
    "color": "#FCCC0A",
    "stations": [
      { "id": 428, "name": "96 St", "lat": 40.784239, "lng": -73.947069 },
      { "id": 431, "name": "86 St", "lat": 40.777891, "lng": -73.951787 },
      { "id": 429, "name": "72 St", "lat": 40.768799, "lng": -73.958424 },
      { "id": 421, "name": "Lexington Av/59 St", "lat": 40.76266, "lng": -73.967258 },
      { "id": 423, "name": "57 St-7 Av", "lat": 40.764664, "lng": -73.980658 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 231, "name": "DeKalb Av", "lat": 40.690635, "lng": -73.981824 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 228, "name": "7th Av", "lat": 40.67705, "lng": -73.972624 },
      { "id": 243, "name": "Prospect Park", "lat": 40.660742, "lng": -73.961334 },
      { "id": 234, "name": "Parkside Av", "lat": 40.655291, "lng": -73.961495 },
      { "id": 259, "name": "Church Av", "lat": 40.650527, "lng": -73.962982 },
      { "id": 242, "name": "Beverley Rd", "lat": 40.644031, "lng": -73.964418 },
      { "id": 430, "name": "Cortelyou Rd", "lat": 40.640927, "lng": -73.963798 },
      { "id": 227, "name": "Newkirk Plaza", "lat": 40.635082, "lng": -73.962793 },
      { "id": 254, "name": "Avenue H", "lat": 40.62927, "lng": -73.963264 },
      { "id": 255, "name": "Avenue J", "lat": 40.625039, "lng": -73.96413 },
      { "id": 256, "name": "Avenue M", "lat": 40.617618, "lng": -73.964592 },
      { "id": 240, "name": "Kings Hwy", "lat": 40.603258, "lng": -73.963408 },
      { "id": 257, "name": "Avenue U", "lat": 40.596063, "lng": -73.96213 },
      { "id": 258, "name": "Neck Rd", "lat": 40.590243, "lng": -73.955196 },
      { "id": 250, "name": "Sheepshead Bay", "lat": 40.586896, "lng": -73.954155 },
      { "id": 237, "name": "Brighton Beach", "lat": 40.577621, "lng": -73.961376 },
      { "id": 427, "name": "Ocean Pkwy", "lat": 40.576312, "lng": -73.968501 },
      { "id": 280, "name": "Coney Island-Stillwell Av", "lat": 40.577422, "lng": -73.981233 }
    ]
  },
  {
    "id": "R",
    "color": "#FCCC0A",
    "stations": [
      { "id": 284, "name": "Forest Hills-71 Av", "lat": 40.721691, "lng": -73.844521 },
      { "id": 286, "name": "67 Av", "lat": 40.726523, "lng": -73.852719 },
      { "id": 432, "name": "63 Dr-Rego Park", "lat": 40.729846, "lng": -73.861604 },
      { "id": 449, "name": "Woodhaven Blvd", "lat": 40.733106, "lng": -73.869229 },
      { "id": 448, "name": "Grand Av-Newtown", "lat": 40.737015, "lng": -73.877223 },
      { "id": 447, "name": "Elmhurst Av", "lat": 40.742454, "lng": -73.882017 },
      { "id": 446, "name": "65 St", "lat": 40.749789, "lng": -73.899232 },
      { "id": 445, "name": "Northern Blvd", "lat": 40.752885, "lng": -73.906006 },
      { "id": 444, "name": "46 St", "lat": 40.756312, "lng": -73.913333 },
      { "id": 443, "name": "Steinway St", "lat": 40.756879, "lng": -73.92074 },
      { "id": 450, "name": "36 St", "lat": 40.752039, "lng": -73.925131 },
      { "id": 291, "name": "Queens Plaza", "lat": 40.748973, "lng": -73.937243 },
      { "id": 421, "name": "Lexington Av/59 St", "lat": 40.76266, "lng": -73.967258 },
      { "id": 420, "name": "5th Av-59 St", "lat": 40.764811, "lng": -73.973347 },
      { "id": 423, "name": "57 St-7 Av", "lat": 40.764664, "lng": -73.980658 },
      { "id": 422, "name": "49 St", "lat": 40.759835, "lng": -73.984139 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 453, "name": "City Hall", "lat": 40.713282, "lng": -74.006978 },
      { "id": 451, "name": "Whitehall St", "lat": 40.703087, "lng": -74.012994 },
      { "id": 403, "name": "Court St", "lat": 40.6941, "lng": -73.991777 },
      { "id": 169, "name": "Jay St-MetroTech", "lat": 40.692331, "lng": -73.987342 },
      { "id": 231, "name": "DeKalb Av", "lat": 40.690635, "lng": -73.981824 },
      { "id": 69, "name": "Atlantic Av-Barclays Ctr", "lat": 40.683666, "lng": -73.97881 },
      { "id": 434, "name": "Union St", "lat": 40.677316, "lng": -73.98311 },
      { "id": 438, "name": "9th St", "lat": 40.670847, "lng": -73.988302 },
      { "id": 439, "name": "Prospect Av", "lat": 40.665414, "lng": -73.992872 },
      { "id": 440, "name": "25 St", "lat": 40.660397, "lng": -73.998091 },
      { "id": 402, "name": "36 St", "lat": 40.648629, "lng": -74.00303 },
      { "id": 441, "name": "45 St", "lat": 40.649068, "lng": -74.009312 },
      { "id": 442, "name": "53 St", "lat": 40.645069, "lng": -74.014034 },
      { "id": 413, "name": "59 St", "lat": 40.641362, "lng": -74.017881 },
      { "id": 435, "name": "Bay Ridge Av", "lat": 40.634967, "lng": -74.023409 },
      { "id": 437, "name": "77 St", "lat": 40.629742, "lng": -74.02551 },
      { "id": 433, "name": "86 St", "lat": 40.622687, "lng": -74.028398 },
      { "id": 436, "name": "95 St", "lat": 40.616622, "lng": -74.030876 }
    ]
  },
  {
    "id": "W",
    "color": "#FCCC0A",
    "stations": [
      { "id": 412, "name": "Astoria-Ditmars Blvd", "lat": 40.775036, "lng": -73.912034 },
      { "id": 411, "name": "Astoria Blvd", "lat": 40.770258, "lng": -73.917843 },
      { "id": 405, "name": "30 Av", "lat": 40.766779, "lng": -73.921479 },
      { "id": 415, "name": "Broadway", "lat": 40.76182, "lng": -73.925508 },
      { "id": 416, "name": "36 Av", "lat": 40.75589, "lng": -73.927364 },
      { "id": 164, "name": "Queensboro Plaza", "lat": 40.750582, "lng": -73.940247 },
      { "id": 421, "name": "Lexington Av/59 St", "lat": 40.76266, "lng": -73.967258 },
      { "id": 420, "name": "5th Av-59 St", "lat": 40.764811, "lng": -73.973347 },
      { "id": 423, "name": "57 St-7 Av", "lat": 40.764664, "lng": -73.980658 },
      { "id": 422, "name": "49 St", "lat": 40.759835, "lng": -73.984139 },
      { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 },
      { "id": 260, "name": "34 St-Herald Sq", "lat": 40.749719, "lng": -73.987823 },
      { "id": 23, "name": "28 St", "lat": 40.745494, "lng": -73.988691 },
      { "id": 29, "name": "23 St", "lat": 40.741303, "lng": -73.989344 },
      { "id": 102, "name": "14 St-Union Sq", "lat": 40.734673, "lng": -73.989951 },
      { "id": 419, "name": "8 St-NYU", "lat": 40.730328, "lng": -73.992629 },
      { "id": 404, "name": "Prince St", "lat": 40.724329, "lng": -73.997702 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 453, "name": "City Hall", "lat": 40.713282, "lng": -74.006978 },
      { "id": 452, "name": "Rector St", "lat": 40.70722, "lng": -74.013342 },
      { "id": 451, "name": "Whitehall St", "lat": 40.703087, "lng": -74.012994 }
    ]
  },
  {
    "id": "Z",
    "color": "#996633",
    "stations": [
      { "id": 289, "name": "Jamaica Center-Parsons/Archer", "lat": 40.702147, "lng": -73.8011 },
      { "id": 294, "name": "Sutphin Blvd-Archer Av-JFK Airport", "lat": 40.700486, "lng": -73.807979 },
      { "id": 363, "name": "121 St", "lat": 40.700579, "lng": -73.828294 },
      { "id": 362, "name": "111 St", "lat": 40.697485, "lng": -73.836303 },
      { "id": 353, "name": "104 St", "lat": 40.695178, "lng": -73.844335 },
      { "id": 345, "name": "Woodhaven Blvd", "lat": 40.693879, "lng": -73.851578 },
      { "id": 344, "name": "75 St-Elderts Ln", "lat": 40.691324, "lng": -73.867135 },
      { "id": 359, "name": "Cyprus Hills", "lat": 40.689941, "lng": -73.87255 },
      { "id": 358, "name": "Crescent St", "lat": 40.683145, "lng": -73.873793 },
      { "id": 361, "name": "Norwood Av", "lat": 40.68141, "lng": -73.880039 },
      { "id": 349, "name": "Cleveland St", "lat": 40.679947, "lng": -73.884739 },
      { "id": 356, "name": "Van Siclen Av", "lat": 40.678024, "lng": -73.891688 },
      { "id": 340, "name": "Alabama Av", "lat": 40.676992, "lng": -73.898406 },
      { "id": 212, "name": "Broadway Junction", "lat": 40.678963, "lng": -73.903258 },
      { "id": 360, "name": "Chauncey St", "lat": 40.682893, "lng": -73.910456 },
      { "id": 350, "name": "Halsey St", "lat": 40.68637, "lng": -73.916559 },
      { "id": 351, "name": "Gates Av", "lat": 40.68963, "lng": -73.92223 },
      { "id": 355, "name": "Kosciuszko St", "lat": 40.693154, "lng": -73.928781 },
      { "id": 342, "name": "Myrtle Av", "lat": 40.697207, "lng": -73.935657 },
      { "id": 354, "name": "Flushing Av", "lat": 40.70037, "lng": -73.945273 },
      { "id": 357, "name": "Lorimer St", "lat": 40.703862, "lng": -73.947408 },
      { "id": 341, "name": "Hewes St", "lat": 40.70687, "lng": -73.95354 },
      { "id": 352, "name": "Marcy Av", "lat": 40.708359, "lng": -73.957757 },
      { "id": 343, "name": "Essex St", "lat": 40.718315, "lng": -73.988691 },
      { "id": 348, "name": "Bowery", "lat": 40.72028, "lng": -73.993915 },
      { "id": 133, "name": "Canal St", "lat": 40.718803, "lng": -74.000193 },
      { "id": 347, "name": "Chambers St", "lat": 40.713243, "lng": -74.003401 },
      { "id": 76, "name": "Fulton St", "lat": 40.710368, "lng": -74.009509 },
      { "id": 195, "name": "Broad St", "lat": 40.706471, "lng": -74.011056 }
    ]
  }
];
// ============================================================

const ALL_STATIONS = Array.from(
  new Map(lines.flatMap(l => l.stations).map(s => [`${s.id}|${s.name}`, s])).values()
);
const ALL_LINES = lines.map(l => l.id);
const LINE_COLORS = Object.fromEntries(lines.map(l => [l.id, l.color]));
const LIGHT_TEXT_LINES = new Set(['N','Q','R','W','S','L','7','G']);

export default function SubwayGame() {
  const [leafletReady, setLeafletReady] = useState(false);
  const [mode, setMode] = useState('menu');
  const [guesses, setGuesses] = useState({});
  const [score, setScore] = useState(0);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lineStations, setLineStations] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [lineResult, setLineResult] = useState(null);
  const [wrongGuess, setWrongGuess] = useState('');

  const mapRef = useRef(null);       // Leaflet map instance
  const markersRef = useRef({});     // station key -> Leaflet marker
  const containerRef = useRef(null); // div ref for map container
  const selectRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Load Leaflet scripts once
  useEffect(() => {
    if (window.L) { setLeafletReady(true); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.body.appendChild(script);
  }, []);

  // Callback ref — fires as soon as the map div is mounted
  const mapDivRef = useCallback((node) => {
    containerRef.current = node;
    if (!node || !leafletReady || mapRef.current) return;
    initMap(node);
  }, [leafletReady]); // re-runs if leaflet loads after div mounts

  const initMap = (container) => {
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    const L = window.L;
    const m = L.map(container, { center: [40.758896, -73.985130], zoom: 12 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 19
    }).addTo(m);

    // Draw lines
    lines.forEach(line => {
      const coords = line.stations.map(s => [s.lat, s.lng]);
      L.polyline(coords, { color: line.color, weight: 4, opacity: 0.7 }).addTo(m);
    });

    // Add markers
    markersRef.current = {};
    ALL_STATIONS.forEach(station => {
      const key = `${station.id}|${station.name}`;
      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 6, fillColor: 'white', color: '#333', weight: 2, fillOpacity: 1
      }).addTo(m);
      marker.on('click', () => {
        if (modeRef.current === 'free') handleFreeClick(station);
      });
      markersRef.current[key] = marker;
    });

    mapRef.current = m;
    setTimeout(() => m.invalidateSize(), 100);
  };

  // Re-init map when switching into a game mode
  useEffect(() => {
    if (mode === 'menu' || mode === 'line-complete') return;
    if (!leafletReady) return;
    if (containerRef.current) initMap(containerRef.current);
  }, [mode, leafletReady]);

  // Update marker styles whenever state changes
  useEffect(() => {
    if (!mapRef.current) return;
    const activeId = mode === 'line' && lineStations[lineIndex]
      ? `${lineStations[lineIndex].id}|${lineStations[lineIndex].name}` : null;

    ALL_STATIONS.forEach(station => {
      const key = `${station.id}|${station.name}`;
      const marker = markersRef.current[key];
      if (!marker) return;
      const guess = guesses[key];
      const isActive = key === activeId;
      marker.setStyle({
        fillColor: isActive ? '#FFD700' : 'white',
        color: isActive ? '#FFD700' : guess?.correct ? '#228B22' : guess?.temporary ? '#DC143C' : '#333',
        weight: isActive ? 4 : 2,
        radius: isActive ? 10 : 6,
        fillOpacity: 1
      });
      if (guess?.correct) {
        marker.bindPopup(`<div style="color:#228B22;font-weight:bold;font-size:14px">✓ ${station.name}</div>`);
      } else {
        marker.unbindPopup();
      }
    });
  }, [guesses, mode, lineIndex, lineStations]);

  // Fly to station in line mode
  useEffect(() => {
    if (mode === 'line' && mapRef.current && lineStations[lineIndex]) {
      const s = lineStations[lineIndex];
      mapRef.current.flyTo([s.lat, s.lng], 15, { duration: 1 });
    }
  }, [lineIndex, lineStations, mode]);

  const startFreeMode = () => {
    setGuesses({}); setScore(0); setSelectedStation(null);
    setMode('free');
  };

  const startLineMode = (lineId) => {
    const line = lines.find(l => l.id === lineId);
    if (!line) return;
    setSelectedLine(lineId);
    setLineStations(line.stations);
    setLineIndex(0);
    setGuesses({}); setScore(0);
    setLineResult(null); setWrongGuess('');
    setMode('line');
  };

  const handleFreeClick = (station) => {
    const key = `${station.id}|${station.name}`;
    if (guesses[key]?.correct) return;
    setSelectedStation(station);
    setTimeout(() => selectRef.current?.focus(), 150);
  };

  const handleFreeGuess = (name) => {
    if (!selectedStation) return;
    const key = `${selectedStation.id}|${selectedStation.name}`;
    if (name === selectedStation.name) {
      setGuesses(p => ({ ...p, [key]: { correct: true } }));
      setScore(s => s + 1);
      setSelectedStation(null);
    } else {
      setGuesses(p => ({ ...p, [key]: { correct: false, temporary: true } }));
      setTimeout(() => setGuesses(p => {
        const n = { ...p }; if (n[key]?.temporary) delete n[key]; return n;
      }), 1500);
    }
  };

  const handleLineGuess = (name) => {
    if (lineResult) return;
    const cur = lineStations[lineIndex];
    const key = `${cur.id}|${cur.name}`;
    const ok = name === cur.name;
    setLineResult(ok ? 'correct' : 'wrong');
    if (!ok) setWrongGuess(name);
    if (ok) { setGuesses(p => ({ ...p, [key]: { correct: true } })); setScore(s => s + 1); }
  };

  const advanceLine = () => {
    setLineResult(null); setWrongGuess('');
    if (selectRef.current) selectRef.current.value = '';
    if (lineIndex + 1 >= lineStations.length) setMode('line-complete');
    else setLineIndex(i => i + 1);
  };

  const goMenu = () => {
    setMode('menu');
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    markersRef.current = {};
  };

  const cur = mode === 'line' ? lineStations[lineIndex] : null;
  const remainingFree = ALL_STATIONS.filter(s => !guesses[`${s.id}|${s.name}`]?.correct);
  const gameComplete = mode === 'free' && remainingFree.length === 0;

  // MENU
  if (mode === 'menu') return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-2">NYC Subway Quiz</h1>
      <p className="text-gray-400 mb-10">{ALL_STATIONS.length} unique stations · {ALL_LINES.length} lines</p>
      <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">🗺 Free Roam Mode</h2>
          <p className="text-gray-400 text-sm mb-4">Click any station on the map and identify it.</p>
          <button onClick={startFreeMode} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Start Free Roam</button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2"><Train size={22}/> Line Mode</h2>
          <p className="text-gray-400 text-sm mb-4">Pick a line and be quizzed on each stop sequentially.</p>
          <div className="flex flex-wrap gap-2">
            {ALL_LINES.map(id => (
              <button key={id} onClick={() => startLineMode(id)}
                style={{ backgroundColor: LINE_COLORS[id], color: LIGHT_TEXT_LINES.has(id) ? '#000' : '#fff' }}
                className="w-10 h-10 rounded-full font-bold text-sm hover:opacity-80">
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // LINE COMPLETE
  if (mode === 'line-complete') return (
    <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Line {selectedLine} Complete!</h1>
      <p className="text-2xl text-gray-300 mb-8">Score: {score} / {lineStations.length}</p>
      <div className="flex gap-4">
        <button onClick={() => startLineMode(selectedLine)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Retry</button>
        <button onClick={goMenu} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg">Menu</button>
      </div>
    </div>
  );

  // GAME
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="bg-white shadow-md p-3 flex items-center justify-between" style={{ zIndex: 1000 }}>
        <div className="flex items-center gap-3">
          <button onClick={goMenu} className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold">
            <RotateCcw size={16}/> Menu
          </button>
          {mode === 'line' && (
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: LINE_COLORS[selectedLine], color: LIGHT_TEXT_LINES.has(selectedLine) ? '#000' : '#fff' }}>
                {selectedLine}
              </span>
              <span className="font-semibold text-gray-700">Stop {lineIndex + 1} of {lineStations.length}</span>
            </div>
          )}
          {mode === 'free' && <span className="font-semibold text-gray-700">Free Roam — {ALL_STATIONS.length} stations</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">{score} / {mode === 'line' ? lineStations.length : ALL_STATIONS.length}</span>
          {gameComplete && <span className="text-green-600 font-bold">🎉 Complete!</span>}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <div ref={mapDivRef} style={{ width: '100%', height: '100%' }} />
        <style>{`.leaflet-container { font-size: 0 !important; } .leaflet-tile-pane { filter: brightness(1.05) grayscale(0.3); }`}</style>

        {/* Line mode panel */}
        {mode === 'line' && cur && (
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 420, padding: '0 16px', zIndex: 1000 }}>
            <div className="bg-white rounded-xl shadow-2xl p-4">
              {!lineResult ? (
                <>
                  <p className="text-sm text-gray-500 mb-2 font-medium">What is this station?</p>
                  <select ref={selectRef} size="6" defaultValue=""
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-500"
                    onChange={e => { if (e.target.value) handleLineGuess(e.target.value); }} autoFocus>
                    <option value="" disabled>Select a station...</option>
                    {lineStations.map(s => s.name).sort().map((n, i) => <option key={i} value={n}>{n}</option>)}
                  </select>
                </>
              ) : (
                <div className={`rounded-lg p-3 ${lineResult === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {lineResult === 'correct'
                    ? <p className="font-bold text-green-800">✓ Correct! {cur.name}</p>
                    : <p className="font-bold text-red-800">✗ Wrong. You said "{wrongGuess}". It was <strong>{cur.name}</strong>.</p>}
                  <button onClick={advanceLine} className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm">
                    {lineIndex + 1 >= lineStations.length ? 'See Results' : 'Next Stop →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Free mode popup */}
      {mode === 'free' && selectedStation && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col" style={{ maxHeight: '80vh' }}>
            <h2 className="text-2xl font-bold mb-4">Name this station:</h2>
            <select ref={selectRef} size="10" defaultValue="" autoFocus
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 mb-4"
              onChange={e => { if (e.target.value) { handleFreeGuess(e.target.value); e.target.value = ''; } }}>
              <option value="" disabled>Select a station...</option>
              {remainingFree.map(s => s.name).sort().map((n, i) => <option key={i} value={n}>{n}</option>)}
            </select>
            <button onClick={() => setSelectedStation(null)} className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

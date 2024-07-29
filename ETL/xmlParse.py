import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import json
import os

def parse_kml(kml_file):
    tree = ET.parse(kml_file)
    root = tree.getroot()
    namespace = {'kml': 'http://www.opengis.net/kml/2.2'}

    stations = []

    for placemark in root.findall('.//kml:Placemark', namespace):
        station = {}
        station['name'] = placemark.find('kml:name', namespace).text
        description = placemark.find('kml:description', namespace).text

        # Use BeautifulSoup to parse the HTML content in the description
        soup = BeautifulSoup(description, 'html.parser')
        table = soup.find('table')
        rows = table.find_all('tr')

        for row in rows:
            cols = row.find_all('td')
            if len(cols) == 2:
                key = cols[0].text.strip()
                value = cols[1].text.strip()
                station[key] = value

        coordinates = placemark.find('kml:Point/kml:coordinates', namespace).text
        station['coordinates'] = coordinates.strip()

        stations.append(station)

    return stations

def main():
    kml_file = r'C:\Users\arortiz\Downloads\CTARAILSTATIONS.kml'
    print(f'KML file path: {kml_file}')
    stations = parse_kml(kml_file)
    
    # Convert the stations list to JSON
    json_data = json.dumps(stations, indent=4)
    
    # Define the output file path
    output_file = os.path.join(os.path.expanduser('~'), 'Downloads', 'stations.json')
    
    # Write the JSON data to the file
    with open(output_file, 'w') as json_file:
        json_file.write(json_data)
    
    print(f'JSON data has been written to {output_file}')

if __name__ == '__main__':
    main()
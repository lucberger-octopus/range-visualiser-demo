import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

import { DemoComponent } from "./components/DemoComponent";
import { SelectorContextContainer } from "./components/selector/selector-container";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <SelectorContextContainer>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          <DemoComponent />
        </MapContainer>
      </SelectorContextContainer>
    </div>
  );
}

export default App;

import type { Car } from "./components/selector/types";
import citreonImage from "./assets/cars/citroen.png";
import ranaultImage from "./assets/cars/renault.png";
import bydImage from "./assets/cars/byd.png";
import leapImage from "./assets/cars/leap.png";

export const mockedCars: Car[] = [
  {
    name: "Citroen e-C3",
    range: 150000,
    image: citreonImage,
  },
  {
    name: "Renault 5 E-TECH",
    range: 300000,
    image: ranaultImage,
  },
  {
    name: "BYD Atto 3",
    range: 400000,
    image: bydImage,
  },
  {
    name: "Leapmotor T03",
    range: 50000,
    image: leapImage,
  },
];

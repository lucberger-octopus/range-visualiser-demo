import styles from "./selector-menu.module.css";
import carImage from "../../assets/cars/car.png";
import type { Car } from "./types";
import { useSelectorContext } from "./selector-context";

const mockedCars: Car[] = [
  {
    name: "Car A",
    range: 250000,
  },
  {
    name: "Car B",
    range: 300000,
  },
  {
    name: "Car C",
    range: 200000,
  },
];

export default function SelectorMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {mockedCars.map((car) => (
          <CarOption key={car.name} car={car} />
        ))}
      </div>
    </div>
  );
}

function CarOption({ car }: { car: Car }) {
  const { selectCar } = useSelectorContext();

  return (
    <div className={styles.car} onClick={() => selectCar(car)}>
      <img className={styles.image} src={carImage} />
      <div className={styles.details}>
        <div className={styles.name}>{car.name}</div>
        <div className={styles.stats}>
          <div className={styles.stat}>Range: {car.range / 1000}km</div>
        </div>
      </div>
    </div>
  );
}

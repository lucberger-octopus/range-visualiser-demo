import styles from "./selector-menu.module.css";
import type { Car } from "./types";
import { useSelectorContext } from "./selector-context";
import { mockedCars } from "../../mocks";

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
  const { selectCar, car: selectedCar } = useSelectorContext();

  return (
    <div
      className={`${styles.car} ${
        car.name === selectedCar?.name ? styles.selected : ""
      }`}
      onClick={() => selectCar(car)}
    >
      <img className={styles.image} src={car.image} />
      <div className={styles.details}>
        <div className={styles.name}>{car.name}</div>
        <div className={styles.stats}>
          <div className={styles.stat}>Range: {car.range / 1000}km</div>
        </div>
      </div>
    </div>
  );
}

import { useCallback, useState, type ReactNode } from "react";
import type { Car, SelectorType } from "./types";
import { SelectorContext } from "./selector-context";
import SelectorMenu from "./selector-menu";

export function SelectorContextContainer({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  const handleSelectCar = useCallback((car: Car) => {
    console.log("Selected car:", car);
    setSelectedCar(car);
  }, []);

  const contextValue: SelectorType = {
    car: selectedCar,
    selectCar: handleSelectCar,
  };

  return (
    <SelectorContext value={contextValue}>
      {children}
      <SelectorMenu />
    </SelectorContext>
  );
}

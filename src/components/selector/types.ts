export type Car = {
  name: string;
  range: number;
};

export type SelectorType = {
  car: Car | undefined;
  selectCar: (car: Car) => void;
};

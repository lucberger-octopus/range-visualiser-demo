export type Car = {
  name: string;
  range: number;
  image: string;
};

export type SelectorType = {
  car: Car | undefined;
  selectCar: (car: Car) => void;
};

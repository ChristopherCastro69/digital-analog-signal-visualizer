export const getInputValue = (): string => {
  const binaryInput = (document.getElementById("binary") as HTMLInputElement)
    .value;
  return binaryInput;
};
export const randomIntFromRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

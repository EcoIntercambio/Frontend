export const isNotEmptyString = (str: string | null | undefined) => {
  return typeof str === "string" && str !== "" && str.trim() !== "";
};

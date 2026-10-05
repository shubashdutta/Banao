export const dateUtils = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

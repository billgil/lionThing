// returns seconds as HH-MM-SS user friendly format
const convertSecondsUI = secondsToCount => {
  const date = new Date(null);
  date.setSeconds(secondsToCount);
  const timeUI = date.toISOString().substr(11, 8);
  return timeUI;
};

export default convertSecondsUI;

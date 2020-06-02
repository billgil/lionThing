// returns amount of seconds as HH-MM-SS user friendly format
const convertSecondsUI = (secondsToCount, date) => {
  date.setSeconds(secondsToCount);
  const timeUI = date.toISOString().substr(11, 8);
  return timeUI;
};

export default convertSecondsUI;

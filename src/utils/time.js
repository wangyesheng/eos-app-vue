function getYearMonthDay(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day
  };
}

function getDate(year, month, day) {
  return new Date(year, month, day);
}

export { getYearMonthDay, getDate };

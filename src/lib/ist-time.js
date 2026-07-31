export function getISTHour(date = new Date()) {
  return parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hourCycle: 'h23',
    }).format(date),
    10
  );
}

export function getISTDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { 
    timeZone: 'Asia/Kolkata' 
  }).format(date);
}

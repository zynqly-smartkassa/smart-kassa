
export function getDateNow() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formatted
}


export function getDateYesterday() {
  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1)

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(yesterday.getDate()).padStart(2, "0");

  const hours = String(yesterday.getHours()).padStart(2, "0");
  const minutes = String(yesterday.getMinutes()).padStart(2, "0");
  const seconds = String(yesterday.getSeconds()).padStart(2, "0");

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formatted
}


export function getDateFormat(date: Date) {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(date.getDate()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;

  return formatted
}


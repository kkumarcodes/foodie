export function notEmpty(val) {
  return !!val && String(val).trim().length > 0;
}

export function isValidEmail(email) {
  return (
    !!email &&
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
}

export function hasProtocol(url) {
  url = url.toLowerCase();
  return (
    url.startsWith('http') || url.startsWith('https') || url.startsWith('ftp')
  );
}

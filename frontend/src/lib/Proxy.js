const proxy = (url) => {
  if (
    window.location.origin === "http://localhost:3000" ||
    window.location.origin === "http://127.0.0.1:3000"
  ) {
    return "http://127.0.0.1:8080" + url;
  } else {
    return window.location.origin + url;
  }
};

export default proxy;
export default function showNotification(statusCode, message) {
  if (open === false) {
    switch (statusCode) {
      case 200:
        setColor("success");
        break;
      case 401:
        setColor("warning");
        break;
      default:
        setColor("danger");
    }
    setOpen(true);
    setMsg(message);
  }
}

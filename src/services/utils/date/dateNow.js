export default function dateNow() {
  return `${new Date(Date.now()).getFullYear()}-${
    new Date(Date.now()).getMonth() + 1 < 10 ? 0 : ""
  }${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate()}`;
}

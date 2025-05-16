// centralizamos toastify, si les parece cambiamos la dirpor otra en vez de /src/Utils/ 

export function showToast(message, color = "#00b09b") {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: `linear-gradient(to right, ${color}, ${color})`
    },
    stopOnFocus: true,
  }).showToast();
}

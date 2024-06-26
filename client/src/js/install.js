const butInstall = document.getElementById("buttonInstall");
butInstall.classList.toggle("hidden", true);

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  //Store the triggered events
  window.deferredPrompt = event;
  //remove the hidden class
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();

  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

console.log(
  "test visibility",
  window.matchMedia("(display-mode: standalone)").matches
);
if (window.matchMedia("(display-mode: standalone)").matches) {
  butInstall.style.visibility = "hidden";
}

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
  console.log("appinstalled event called");
});

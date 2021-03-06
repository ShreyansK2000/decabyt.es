import Terminal from "./term.js";
import termProps from "./props/bootstrap.js";
import request from "./request.js";
import colors from "./colors.js";
import "./aesthecc.css";

// Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

/**
 * On window load, we create a new terminal instance with
 * the properties we pass in, print the current time, and
 * log into our terminal.
 */
window.onload = async () => {
  let term = new Terminal(termProps);
  term.init(document.getElementById("terminal"));
  term.writeln({
    text: `decabyt.es ${__COMMIT_HASH} (built ${__BUILD_DATE})`,
    color: colors.green,
  });
  term.writeln("Current date and time: " + new Date().toString());
  try {
    let ip = await request(".netlify/functions/echo", {
      timeout: 1500,
    });
    term.writeln("Connected from " + ip);
  } catch (e) {
    term.writeln("Couldn't get client identity.");
  }
  term.writeln("----");
  term.login();
};

window.addEventListener("message", function(event) {
  if (event.data === "valentine-yes") {
    document.getElementById("valentine-main").classList.add("hidden");
    document.getElementById("tabs-section").classList.remove("hidden");

    document.querySelector('.tab-btn[data-tab="love-letter"]').click();
  }
});


// Tab switching
const tabs = document.querySelectorAll(".tab-btn");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    panes.forEach(pane => pane.classList.add("hidden"));
    tabs.forEach(t => t.classList.remove("active"));

    document.getElementById(tab.dataset.tab).classList.remove("hidden");
    tab.classList.add("active");
  });
});

// Default tab open
document.querySelector('.tab-btn[data-tab="love-letter"]').click();

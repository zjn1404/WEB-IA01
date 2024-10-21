function toggleNewsSelection(event) {
  if (!event.target.classList.contains("Play-Btn")) {
    return;
  }

  if (event.target.textContent === "⬇︎") {
    event.target.textContent = "▶";
  } else {
    event.target.textContent = "⬇︎";
  }

  let $newsItem = $(event.target).closest(".News");
  $newsItem.toggleClass("Selected");
}

function setupNewsToggle() {
  $(".News-Header").click(toggleNewsSelection);
}

$(function () {
  $(".Side").sortable({
    handle: ".Move-Btn",
    axis: "y",
    helper: "clone",
    opacity: 0.6,
    start: function (event, ui) {
      ui.helper.addClass("News-Shadow");
    },
  });
});

$(document).ready(function () {
  setupNewsToggle();
});
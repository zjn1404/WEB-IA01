let selectedMenu = null;

function addSelectedMenu() {
  let menuClass = this.className
    .split(" ")
    .findLast((c) => c.startsWith("Menu-"));
  $(".Menu." + menuClass).addClass("Selected");
  $(".Menu-Footer." + menuClass).addClass("Selected");
}

function removeSelectedMenu() {
  if (selectedMenu) {
    return;
  }

  let menuClass = this.className
    .split(" ")
    .findLast((c) => c.startsWith("Menu-"));
  $(".Menu." + menuClass).removeClass("Selected");
  $(".Menu-Footer." + menuClass).removeClass("Selected");
}

function handleMenuClick() {
  $(".Menu, .Menu-Footer").removeClass("Selected");

  let menuClass = this.className
    .split(" ")
    .filter(function (c) {
      return c.startsWith("Menu-");
    })
    .pop();
  $(".Menu." + menuClass + ", .Menu-Footer." + menuClass).addClass("Selected");

  selectedMenu = menuClass;
}

function setupMenuSynchronization() {
  $(".Menu, .Menu-Footer").hover(addSelectedMenu, removeSelectedMenu);

  $(".Menu, .Menu-Footer").click(handleMenuClick);
}

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

function setup() {
  setupMenuSynchronization();
  setupNewsToggle();
}

$(document).ready(function () {
  setup();
});

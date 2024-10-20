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

function setup() {
  setupMenuSynchronization();
}

$(document).ready(function () {
  setup();
});

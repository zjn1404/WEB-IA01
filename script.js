// Menu Synchronization

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

// Side section

// News Toggle

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

// News Drag and Drop
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

// Text Process
let originalText = $(".Main-Text").text();

$(".Highlight-Btn").click(function () {
  let pattern = $(".Input-Process").val();
  let regex = new RegExp(pattern, "gi");
  let highlightedText = $(".Main-Text")
    .text()
    .replace(regex, function (match) {
      return '<span class="Highlight-Text">' + match + "</span>";
    });

  $(".Main-Text").html(highlightedText);

  updateHighlightStyles();
});

$(".Delete-Btn").click(function () {
  let pattern = $(".Input-Process").val();
  let regex = new RegExp(pattern, "gi");
  let newText = $(".Main-Text").text().replace(regex, "");
  $(".Main-Text").text(newText);

  updateHighlightStyles();
});

$(".Reset-Btn").click(function () {
  $(".Main-Text").text(originalText);
  $(".Input-Process").val("");

  setupHighlightedText();
});

$(".Color-Text-Modify").on("input", function () {
  $(".Highlight-Text").css("color", $(this).val());
});

$(".Color-Highlight-Modify").on("input", function () {
  $(".Highlight-Text").css("background-color", $(this).val());
});

$(".bold-btn, .italic-btn, .underline-btn").change(function () {
  updateHighlightStyles();
});

function updateHighlightStyles() {
  $(".Highlight-Text").css("color", $(".Color-Text-Modify").val());
  $(".Highlight-Text").css(
    "background-color",
    $(".Color-Highlight-Modify").val()
  );

  if ($(".bold-btn").is(":checked")) {
    $(".Highlight-Text").css("font-weight", "bold");
  } else {
    $(".Highlight-Text").css("font-weight", "normal");
  }

  if ($(".italic-btn").is(":checked")) {
    $(".Highlight-Text").css("font-style", "italic");
  } else {
    $(".Highlight-Text").css("font-style", "normal");
  }

  if ($(".underline-btn").is(":checked")) {
    $(".Highlight-Text").css("text-decoration", "underline");
  } else {
    $(".Highlight-Text").css("text-decoration", "none");
  }
}

$(".Tool-Btn").click(function () {
  $(".Tool-Dropdown").css("display", "block");
});

function setupHighlightedText() {
  $(".Color-Text-Modify").val("#000000");
  $(".Color-Highlight-Modify").val("#FFFF00");
  $(".Highlight-Text").css("color", $(".Color-Text-Modify").val());
  $(".Highlight-Text").css(
    "background-color",
    $(".Color-Highlight-Modify").val()
  );
}

// Drag and Drop Section

// Add New

function toDownArrow() {
  $(".Select-Arrow").text("▼");
  $(".Select-Arrow").css("color", "gray");
  $(".Select-Container").css("border", "2px solid #475bf7");
}

function toUpArrow() {
  $(".Select-Arrow").text("▲");
  $(".Select-Arrow").css("color", "green");
  $(".Select-Container").css("border", "2px solid green");
}

function toggleAnimalDropdown() {
  $(".Animal-Dropdown").toggleClass("show");
  if ($(".Select-Arrow").text() === "▼") {
    toUpArrow();
  } else {
    toDownArrow();
  }
}

function updateSelectedAnimal() {
  const selectedAnimal = $(this).text();
  const selectedValue = $(this).attr("title");
  $(".Selected-Animal").text(selectedAnimal).attr("title", selectedValue);
  $(".Animal-Dropdown").removeClass("show");
  toDownArrow();
}

function addNewAnimal() {
  const selectedAnimal = $(".Selected-Animal").text();
  const selectedValue = $(".Selected-Animal").attr("title");
  if (selectedValue) {
    const newAnimalHtml = `
      <div class="box-container">
        <div class="box">
          <div class="content">${selectedAnimal}</div>
        </div>
        <p>${selectedValue}</p>
      </div>
    `;

    $(".DragDrop-Content").append(newAnimalHtml);

    initDragDrop($(".DragDrop-Content .box-container:last-child")[0]);
  }
}

function setupAnimalDropdown() {
  $(".Selected-Animal, .Select-Arrow").click(toggleAnimalDropdown);

  $(".Animal-Dropdown li").click(updateSelectedAnimal);

  $(document).click(function (event) {
    if (!$(event.target).closest(".Select-Container").length) {
      $(".Animal-Dropdown").removeClass("show");
      toDownArrow();
    }
  });

  $(".Add-Animal-Btn").click(addNewAnimal);
}

// Drag and Drop

$(function () {
  $(".DragDrop-Content").sortable({
    placeholder: "Animal-Placeholder",
    cursor: "default",
    tolerance: "pointer",
    start: function (e, ui) {
      ui.placeholder.height(ui.item.outerHeight());
      ui.placeholder.width(ui.item.outerWidth());
    },
  });
});

$(document).click(function (event) {
  if (
    !$(event.target).closest(".Tool-Btn").length &&
    !$(event.target).closest(".Tool-Dropdown").length
  ) {
    $(".Tool-Dropdown").css("display", "none");
  }
});

function setup() {
  setupMenuSynchronization();
  setupNewsToggle();
  setupHighlightedText();
  setupAnimalDropdown();
}

$(document).ready(function () {
  setup();
});

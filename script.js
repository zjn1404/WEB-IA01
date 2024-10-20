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

function initDragDrop(obj) {
  obj.onmousedown = function (e) {
    this.style.position = "relative";
    let shadow = this.cloneNode(true);
    shadow.style.position = "absolute";
    let parent = this.parentNode;
    parent.appendChild(shadow);
    shadow.obj = this;
    shadow.x0ld = e.clientX;
    shadow.y0ld = e.clientY;
    shadow.isDown = true;
    shadow.style.opacity = 0.4;
    shadow.style.left = this.offsetLeft + "px";
    shadow.style.top = this.offsetTop + "px";
    shadow.style.zIndex = 1000;
    shadow.startL = parseInt(shadow.style.left);
    shadow.startT = parseInt(shadow.style.top);
    if (!this.style.left) {
      this.style.left = "0px";
      this.style.top = "0px";
    }

    shadow.onmousemove = function (e) {
      if (this.isDown) {
        let dX = e.clientX - this.x0ld;
        let dY = e.clientY - this.y0ld;
        this.style.top = parseInt(this.style.top) + dY + "px";
        this.style.left = parseInt(this.style.left) + dX + "px";
        this.x0ld = e.clientX;
        this.y0ld = e.clientY;
      }
    };

    shadow.onmouseup = function (e) {
      this.isDown = false;
      let obj = this.obj;
      let parent = obj.parentNode;
      let dX = parseInt(this.style.left) - this.startL;
      let dY = parseInt(this.style.top) - this.startT;
      obj.style.left = parseInt(obj.style.left) + dX + "px";
      obj.style.top = parseInt(obj.style.top) + dY + "px";
      parent.removeChild(this);
    };
  };
}

function setupDragAndDrop() {
  let boxes = document.querySelectorAll(".box-container");
  for (let i = 0; i < boxes.length; i++) {
    initDragDrop(boxes[i]);
  }
}

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
  setupDragAndDrop();
}

$(document).ready(function () {
  setup();
});

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

$(document).ready(function () {
  setupAnimalDropdown();
});
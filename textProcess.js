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

$(document).click(function (event) {
  if (
    !$(event.target).closest(".Tool-Btn").length &&
    !$(event.target).closest(".Tool-Dropdown").length
  ) {
    $(".Tool-Dropdown").css("display", "none");
  }
});

$(document).ready(function () {
  setupHighlightedText();
});

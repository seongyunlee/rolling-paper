var fixedratio = document.querySelector(".fixed-ratio");
var html = document.querySelector("html");
//automatically resize the root font size

function setRootFontSize() {
  if (fixedratio != null)
    html.style.fontSize =
      parseFloat(getComputedStyle(fixedratio).getPropertyValue("height")) / 90 +
      "px";
}
addEventListener("load", setRootFontSize);
addEventListener("resize", setRootFontSize);

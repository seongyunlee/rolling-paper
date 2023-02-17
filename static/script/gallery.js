const movingBox = document.querySelector(".moving-box");
const textComment = document.querySelector("#text-options");
const preview = document.querySelector(".preview");
const posOk = document.querySelector("#move-done-btn");
const typeMessageBtn = document.querySelector("#type-message");
const typeMessageBox = document.querySelector("#type-message-box");
const mainOptionBox = document.querySelector("#main-options");
const typeDoneBtn = document.querySelector("#btn-type-done");
const typeCancelBtn = document.querySelector("#btn-type-cancel");
const typeField = document.querySelector("#text-message");

let moving = false;
let prevX, prevY;
let p_width, p_height;

const setWindowSize = (e) => {
  p_width = getComputedStyle(html).getPropertyValue("width").slice(0, -2);
  p_height = getComputedStyle(preview).getPropertyValue("height").slice(0, -2);
};

const textDone = () => {
  textComment.classList.add("hidden");
  movingBox.classList.remove("hidden");
  movingBox.innerHTML = textField.value;
};

const moveBox = (e) => {
  var nY, nX;
  if (e.constructor == TouchEvent) {
    var touch = e.changedTouches[0];
    nY = movingBox.offsetTop + (touch.clientY - prevY);
    nX = movingBox.offsetLeft + (touch.clientX - prevX);
  } else {
    if (!moving) return;
    nY = movingBox.offsetTop + (e.clientY - prevY);
    nX = movingBox.offsetLeft + (e.clientX - prevX);
  }
  if (
    preview.offsetTop < nY &&
    nY + movingBox.offsetHeight < preview.offsetTop + preview.offsetHeight
  )
    movingBox.style.top = `${nY}px`;
  if (
    preview.offsetLeft < nX &&
    nX + movingBox.offsetWidth < preview.offsetLeft + preview.offsetWidth
  )
    movingBox.style.left = `${nX}px`;
  if (e.constructor == TouchEvent) {
    prevX = touch.clientX;
    prevY = touch.clientY;
  } else {
    prevX = e.clientX;
    prevY = e.clientY;
  }
};

const startMoveBox = (e) => {
  const touch = e.changedTouches[0];
  prevX = touch.clientX;
  prevY = touch.clientY;
};

const mouseStartMoveBox = (e) => {
  moving = true;
  prevX = e.clientX;
  prevY = e.clientY;
};
const moveBoxOnResize = (e) => {
  const np_width = getComputedStyle(html)
    .getPropertyValue("width")
    .slice(0, -2);
  const np_height = getComputedStyle(preview)
    .getPropertyValue("height")
    .slice(0, -2);
  const og_top = getComputedStyle(movingBox)
    .getPropertyValue("top")
    .slice(0, -2);
  const og_left = getComputedStyle(movingBox)
    .getPropertyValue("left")
    .slice(0, -2);
  movingBox.style.top = `${og_top * (np_height / p_height)}px`;
  movingBox.style.left = `${og_left * (np_width / p_width)}px`;
  p_width = getComputedStyle(html).getPropertyValue("width").slice(0, -2);
  p_height = getComputedStyle(preview).getPropertyValue("height").slice(0, -2);
};

const sendComment = (e) => {
  if (true) {
    const posX =
      (movingBox.offsetLeft - preview.offsetLeft) / preview.offsetWidth;
    const posY =
      (movingBox.offsetTop - preview.offsetTop) / preview.offsetHeight;
    const message = movingBox.innerHTML;
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute(
      "action",
      "/paper/newMessage/" + location.href.split("/").at(-1)
    );
    const params = { posX: posX, posY: posY, message: message };
    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  }
};
const typeMessage = () => {
  typeMessageBox.classList.remove("hidden");
  mainOptionBox.classList.add("hidden");
};
const doneType = () => {
  typeMessageBox.classList.add("hidden");
  movingBox.innerHTML = typeField.value;
  textComment.classList.remove("hidden");
};
const cancelType = () => {
  typeMessageBox.classList.add("hidden");
  mainOptionBox.classList.remove("hidden");
};

typeCancelBtn.addEventListener("click", cancelType);
typeDoneBtn.addEventListener("click", doneType);
typeMessageBtn.addEventListener("click", typeMessage);
posOk.addEventListener("click", sendComment);
addEventListener("resize", moveBoxOnResize);
addEventListener("load", setWindowSize);

//draggable element

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

movingBox.addEventListener("mousedown", dragStart);
movingBox.addEventListener("touchstart", dragStart);
movingBox.addEventListener("mouseup", dragEnd);
movingBox.addEventListener("touchend", dragEnd);
movingBox.addEventListener("mousemove", drag);
movingBox.addEventListener("touchmove", drag);

function dragStart(e) {
  initialX = e.clientX || e.touches[0].clientX;
  initialY = e.clientY || e.touches[0].clientY;

  xOffset = initialX - movingBox.offsetLeft;
  yOffset = initialY - movingBox.offsetTop;

  isDragging = true;
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX || e.touches[0].clientX;
    currentY = e.clientY || e.touches[0].clientY;

    xOffset = currentX - initialX;
    yOffset = currentY - initialY;
    if (
      preview.offsetTop < movingBox.offsetTop + yOffset &&
      movingBox.offsetTop + yOffset + movingBox.offsetHeight <
        preview.offsetTop + preview.offsetHeight
    ) {
      movingBox.style.top = movingBox.offsetTop + yOffset + "px";
    }
    if (
      preview.offsetLeft < movingBox.offsetLeft + xOffset &&
      movingBox.offsetLeft + xOffset + movingBox.offsetWidth <
        preview.offsetLeft + preview.offsetWidth
    ) {
      movingBox.style.left = movingBox.offsetLeft + xOffset + "px";
    }

    initialX = currentX;
    initialY = currentY;
  }
}

let isDraw = false ;

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('load',()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawStart = () => {
    isDraw=true;
    ctx.beginPath();
    ctx.lineWidth = 1;
    console.log("drawstart");
}
const drawing = (e)=>{
    e.preventDefault();
    if(!isDraw) return;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    console.log("drawing");
}
const touchdrawing = (e)=>{
    e.preventDefault();
    if(!isDraw) return;
    const touch = e.changedTouches[0];
    ctx.lineTo(touch.clientX,touch.clientY);
    ctx.stroke();
    ctx.lineWidth =3 ;
    console.log(touch.clientX,touch.clientY);
}


canvas.addEventListener('mouseup',()=>{isDraw=false})
canvas.addEventListener('mousedown',drawStart);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('touchend',()=>{isDraw=false})
canvas.addEventListener('touchstart',drawStart);
canvas.addEventListener('touchmove',touchdrawing);
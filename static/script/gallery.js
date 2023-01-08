const textField = document.querySelector('.text-field');
const doneBtn = document.querySelector('#done-btn');
const movingBox = document.querySelector('.moving-box')
const textComment = document.querySelector('.text-comment');
const preview = document.querySelector('.preview');
let moving = false;
let prevX,prevY;

const textDone = () =>{
    textComment.classList.add('hidden');
    movingBox.classList.remove('hidden');
    movingBox.innerHTML=textField.value;
}


const resize = (e)=>{
    e.style.height='auto';
    e.style.height=(12+e.scrollHeight) +'px';
}

const moveBox = (e)=>{
    const touch = e.changedTouches[0];
    console.log(movingBox.style.top,movingBox.style.left);
    movingBox.style.top=`${movingBox.offsetTop+(touch.clientY-prevY)}px`;
    movingBox.style.left=`${movingBox.offsetLeft+(touch.clientX-prevX)}px`;
    prevX=touch.clientX;
    prevY=touch.clientY;
}

const startMoveBox = (e)=>{
    const touch = e.changedTouches[0];
    prevX=touch.clientX;
    prevY=touch.clientY;
}
doneBtn.addEventListener('click',textDone);
preview.addEventListener('touchmove',moveBox);
preview.addEventListener('touchstart',startMoveBox);
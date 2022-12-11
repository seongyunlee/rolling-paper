const writeBtn = document.querySelector('.btn-newMessage');
const messageInput = document.querySelector('.input-message');
const sendBtn = document.querySelector('.send');
const cancelBtn = document.querySelector('.cancel');
const messageBox = document.querySelector('.message-box');
const paper = document.querySelector(".fixed-ratio");
const html = document.querySelector("html")


//automatically resize the root font size
function setRootFontSize() {
    
    if (paper!=null)  html.style.fontSize = parseFloat(getComputedStyle(paper).getPropertyValue('height'))/100 +'px';
    //console.log(html.style.fontSize);
}
  addEventListener("load",setRootFontSize);
  addEventListener("resize", setRootFontSize);


//chk form
const chkform = ()=>{
    if(messageInput.value==''){
        alert("메시지를 입력하세요");
        return false;
    }
    return true;
}
writeBtn.addEventListener('click',()=>{
    messageBox.classList.remove('hidden');
})

cancelBtn.addEventListener('click',()=>{
    messageInput.value = '';
    messageBox.classList.add('hidden');
})

sendBtn.addEventListener('click',()=>{
    const message = messageInput.value;
    url.searchParams.append("message",message);
    location.replace(decodeURIComponent(url));
})
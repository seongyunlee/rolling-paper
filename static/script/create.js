const preview = document.querySelector('.preview');
const colors = document.querySelectorAll('.color-option');
const makebtn = document.querySelector('#btn-make-paper');
const titleInp = document.querySelector('.input-title')
const paper = document.querySelector(".fixed-ratio");
const html = document.querySelector("html")

function setRootFontSize() {    
    if (paper!=null)  html.style.fontSize = parseFloat(getComputedStyle(paper).getPropertyValue('height'))/100 +'px';
}

makebtn.addEventListener('click',()=>{
    if(titleInp.value==''){
        alert('제목을 입력하세요');
        return;
    }
    const url = new URL(location.href+"/new");
    url.searchParams.append("color",window.getComputedStyle(preview).getPropertyValue('background-image'));
    url.searchParams.append("title",titleInp.value);
    location.replace(decodeURIComponent(url));
})

colors.forEach((element)=>{
    element.addEventListener('click',(e)=>{preview.style.backgroundImage=window.getComputedStyle(e.target).getPropertyValue("background-image");
    console.log(window.getComputedStyle(e.target).getPropertyValue("background-image").cssText)});
});

addEventListener("load",setRootFontSize);
addEventListener("resize", setRootFontSize);
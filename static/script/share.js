const copy_btn = document.querySelector('.copy-link');
const share_kakao = document.querySelector('.share-kakao');
const btn_draw = document.querySelector('.btn-draw');
const paper_url = document.querySelector('.paper-url')
const paper = document.querySelector(".fixed-ratio");
const html = document.querySelector("html")

//automatically resize the root font size
function setRootFontSize() {
    
    if (paper!=null)  html.style.fontSize = parseFloat(getComputedStyle(paper).getPropertyValue('height'))/100 +'px';
    //console.log(html.style.fontSize);
}
  addEventListener("load",setRootFontSize);
  addEventListener("resize", setRootFontSize);


//clipboard api is not supported in http
/*
const copy_url = ()=>{
        const content = document.getElementById('paper-url'); 
        content.select();
        content.setSelectionRange(0, 99999);   // select url area
        document.execCommand('copy');
        content.setSelectionRange(0, 0); //copy to clip board
    
}
*/
copy_btn.addEventListener('click',copy_url);
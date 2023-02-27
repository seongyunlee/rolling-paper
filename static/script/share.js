const copy_btn = document.querySelector(".copy-link");
const share_kakao = document.querySelector(".share-kakao");
const btn_draw = document.querySelector(".btn-draw");
const paper_url = document.querySelector(".paper-url");

const shareLink = (link) => {
  window.navigator.clipboard.writeText(link).then(() => {
    // 복사가 완료되면 이 부분이 호출된다.
    alert("복사 완료!");
  });
};

const clipboardCopy = () => {
  window.navigator.clipboard.writeText(link).then(() => {
    // 복사가 완료되면 이 부분이 호출된다.
    alert("복사 완료!");
  });
};

const idInput = document.querySelector("#input-id");
const pwdInput = document.querySelector("#input-pwd");

//check form
const chkform = () => {
  if (idInput.value == "") {
    alert("아이디를 입력하세요");
    return false;
  }

  if (pwdInput.value == "") {
    alert("비밀번호를 입력하세요");
    return false;
  }
  return true;
};

const emailinput = document.querySelector('.emailinput')
const passwordinput = document.querySelector('.passwordinput')
const loginbtn = document.querySelector('#loginbtn')
const nicknameinput = document.querySelector('.nicknameinput');
const passwordcheck = document.querySelector('.passwordcheck');


loginbtn.addEventListener("click", () => {
  let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  let email = emailinput.value;
  let password = passwordinput.value;

  let nickname = nicknameinput.value;

  if (!emailRule.test(email)) {
    let emailtext = document.querySelector('.emailtext')
    emailtext.style.display = "block"
    emailtext.textContent = "填入信箱有誤";
    return
  } else {
    let emailtext = document.querySelector('.emailtext')
    emailtext.style.display = "none"

  }
  if (password.length < 6) {

    let passwordtext = document.querySelector('.passwordtext')
    passwordtext.style.display = "block"
    passwordtext.textContent = "密碼長度不可小於6個字元";
    return


  } else {
    let passwordtext = document.querySelector('.passwordtext')
    passwordtext.style.display = "none"


  }

  if (nickname == '') {

    return
  }

  if (passwordcheck.value != password) {
    let passwrodchecktext = document.querySelector('.passwordchecktext')
    passwrodchecktext.style.display = "block";
    passwrodchecktext.textContent = "密碼不相同";
    return
  } else {
    let passwrodchecktext = document.querySelector('.passwordchecktext')
    passwrodchecktext.style.display = "none"

  }


  axios.post('https://todoo.5xcamp.us/users', {
    user: {
      email: `${email}`,
      nickname: `${nickname}`,
      password: `${password}`
    }
  }
  ).then((response) => {
    let data = response;
    alert(data.data.message);
  }).catch(function (error) {
    // 失敗會回傳的內容
    let errordata = error;

    alert(errordata.response.data.message);
  }).then(function () {
    location.href = 'index.html';
  })


})

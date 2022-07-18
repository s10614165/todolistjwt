const emailinput = document.querySelector('.emailinput')
const passwordinput = document.querySelector('.passwordinput')
const loginbtn = document.querySelector('#loginbtn')


loginbtn.addEventListener("click", () => {
  let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  let email = emailinput.value;
  let password = passwordinput.value;
  let emailtext = document.querySelector('.emailtext')
  let passwordtext = document.querySelector('.passwordtext')
  if (!emailRule.test(email)) {
    emailtext.style.display = "block"
    emailtext.textContent = "填入信箱有誤";
    return
  }
  emailtext.style.display = "none";


  if (password.length < 6) {
    passwordtext.style.display = "block"
    passwordtext.textContent = "密碼長度不可小於6個字元";
    return


  } passwordtext.style.display = "none"
  axios.post('https://todoo.5xcamp.us/users/sign_in', {

    user: {
      email: `${email}`,
      password: `${password}`
    }
  }
  ).then((response) => {
    let data = response;
    console.log(data);
    let authorization = data.headers.authorization;
    console.log(authorization)
    let nickaname = data.data.nickname;
    console.log(nickaname)
    localStorage.setItem('authorization', authorization)
    localStorage.setItem('nickname', nickaname)
    alert(data.data.message);
    location.href = 'todolistjwt.html';

  }).catch(function (error) {
    // 失敗會回傳的內容
    let errordata = error;
    alert(errordata.response.data.message);
  })
})

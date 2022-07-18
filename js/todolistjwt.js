let data = [];
const listinput = document.querySelector('#ListInput');
const addbtn = document.querySelector('#ListAdd');
const listul = document.querySelector('.listul');
const deletebtn = document.querySelectorAll('.vector');
const divtitle = document.querySelector('.c-listtitle');
const todonum = document.querySelector('.todonum');
const cleanbtn = document.querySelector('.cleanfinishbtn');
const singoutbtn = document.querySelector('.logooutbtn');
const nickaname = document.querySelector('.login-name')
console.log(nickaname);

let authorization = localStorage.getItem('authorization');
let nicname = localStorage.getItem('nickname');
console.log(nicname);


// 登入檢查是否登入狀態
axios.get('https://todoo.5xcamp.us/check', {
  headers: {
    Authorization: `${authorization}`
  }
}).then(() => {
  nickaname.textContent = `${nicname}的代辦`
  init()
})
  .catch(() => {
    location.replace('../index.html');
  })
// 按下+新增
addbtn.addEventListener("click", function (e) {
  if (listinput.value === '') {
    return
  }
  axios.post('https://todoo.5xcamp.us/todos', {
    content: listinput.value
  }, {
    headers: {
      Authorization: `${authorization}`
    }
  }).then(function () {
    listinput.value = '';
    init();
  })
})
// 按下Enter鍵新增
listinput.addEventListener('keypress', function (e) {
  if (e.key === "Enter") {
    if (listinput.value === '') {
      return
    }
    axios.post('https://todoo.5xcamp.us/todos', {
      content: listinput.value
    }, {
      headers: {
        Authorization: `${authorization}`
      }
    }).then(function () {
      listinput.value = '';
      init();
    })
  }
})
// 點擊Ｘ刪除項目&點擊是否完成
listul.addEventListener("click", function (e) {

  if (e.target.getAttribute("class") === 'vector') {
    let num = parseInt(e.target.getAttribute("data-num"));
    // console.log(num);
    // console.log(data);
    // console.log(data.id);
    axios.delete(`https://todoo.5xcamp.us/todos/${data[num].id}`, {
      headers: {
        Authorization: `${authorization}`
      }
    }
    ).then(function () {
      init();
    })



  };

  if (e.target.getAttribute("class") == 'donebox') {
    // console.log(e.target.getAttribute("class"));
    const checkbox = document.querySelectorAll(".donebox");
    // console.log(num);
    // console.log(data);
    // console.log(checkbox.getAttribute(''))
    // console.log(checkbox)
    data.forEach(function (item, index) {
      // console.log(item)

      if (checkbox[index].checked === true && e.target.getAttribute("data-num") === item.id) {

        axios.patch(`https://todoo.5xcamp.us/todos/${item.id}/toggle`, {}, {
          headers: {
            Authorization: authorization
          }
        }).then(function (res) {

          init();


        }).catch((err) => {

        })
        return
      }
      if (checkbox[index].checked === false && e.target.getAttribute("data-num") === item.id) {

        axios.patch(`https://todoo.5xcamp.us/todos/${item.id}/toggle`, {}, {
          headers: {
            Authorization: authorization
          }
        }).then(function (res) {

          init();
        }).catch((err) => {

        })

      }
    })
  }
  // 增加斜線 完成
})
divtitle.addEventListener("click", function (e) {
  if (e.target.getAttribute('id') === 'listAll') {

    init();
  } else if (e.target.getAttribute('id') === 'listFinsh') {
    // console.log(data);
    let finshdata = [];
    data.forEach(function (item) {

      if (item.completed_at) {
        finshdata.push(item);
      };
      // console.log(finshdata);
    })
    addlist(finshdata);
    todonum.textContent = `完成${finshdata.length}個代辦事項`;
  }
  else if (e.target.getAttribute('id') === 'listTodo') {
    let tododata = [];
    data.forEach(function (item) {
      // console.log(item);
      if (item.completed_at === null) {
        tododata.push(item);


      };

    })
    addlist(tododata);

  }
})
cleanbtn.addEventListener('click', function () {
  data.forEach(function (item) {
    if (item.Ischeckcd === true) {
      axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${item.id}`, {
      }).then(function () {

        init();
      })
    }
  })

})

// Sign out
singoutbtn.addEventListener('click', () => {
  console.log(authorization);
  axios.delete('https://todoo.5xcamp.us/users/sign_out', {
    headers: {
      Authorization: `${authorization}`
    }
  }).then((res) => {
    console.log(res)
    localStorage.removeItem('authorization');
    alert(res.data.message);
    location.href = '../index.html';
  })
})

function addlist(ary) {
  let str = '';
  let finshdata = 0;
  let dodata = 0;
  ary.forEach(function (item, index) {
    // console.log(item)
    if (item.completed_at != null) {
      str += `<li class="listli"><input type="checkbox" name="" class="donebox" id="donebox" data-num=${item.id} checked=checked> <label for="" class="lilabel">${item.content}</label> <input type="button" value=""
              class= "vector" data-num=${index}></li >`;
      dodata++
      return

    }
    str += `<li class="listli"><input type="checkbox" name="" class="donebox" id="donebox" data-num=${item.id}><label  class="lilabel">${item.content}</label> <input type="button" value=""
              class= "vector" data-num=${index}></li >`;
    finshdata++;

  });
  listul.innerHTML = str;

  todonum.textContent = `${finshdata}個代辦事項`;
}
// 刪除所有資料用
// axiosdelete();
function axiosdelete() {
  axios.get('https://fathomless-brushlands-42339.herokuapp.com/todo1')
    .then(function (response) {
      response.data.length
      for (let index = 1; index <= response.data.length; index++) {
        axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${index}`, {
        })
      }
    })
}



function init() {
  axios.get('https://todoo.5xcamp.us/todos', {
    headers: {
      Authorization: `${authorization}`
    }
  })
    .then(function (response) {
      data = response.data.todos;
      addlist(data);
    });
}
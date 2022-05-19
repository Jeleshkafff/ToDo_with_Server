let container = document.querySelector(".container");
let h1 = document.createElement("h1");
container.append(h1);
let form = document.createElement("form");
container.append(form);
let ul = document.createElement("ul");
container.append(ul);
let mass = [];
let massDB = [];

// async function getFunction() {
//   const response = await fetch("http://localhost:3000/api/todos");
//   const data = await response.json();
//   console.log(data);
// }

async function inputDB(forDb) {
  let owNer = document.querySelector(".my").textContent;

  const response = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      name: forDb,
      owner: owNer,
      done: false,
    }),
  });
  // massDB.push(massDB.length);
  //const data = await response.json();
  // console.log(data);
}
//inputDB("GHJGJKGKLRJHT GHTRUHRGHR");
async function ChangeTru(id) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      done: true,
    }),
  });
}
async function deleteiddb(id) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
}

async function create_all(text, data) {
  createAppTitle();
  const inp = createTodoItemForm();

  createTodoList();
  const btn = document.querySelector(".btn");
  console.log(inp);
  function createAppTitle() {
    h1.textContent = text;
    h1.className = "h1";
  }

  function createTodoItemForm() {
    let inp = document.createElement("input");
    form.append(inp);
    inp.className = "input";
    let btn = document.createElement("button");
    btn.textContent = "Create task";
    form.append(btn);
    btn.className = "btn";
    btn.disabled = true;

    return inp;
  }
  const response = await fetch("http://localhost:3000/api/todos");
  const massarr = (await response.json()) || [];
  console.log(massarr);
  //let massarrfil = await
  // switch (document.querySelector(".my").textContent) {
  //   case "Для меня":
  // const massarrfil = [];
  // massarr.forEach((element) => {
  //   if (element.owNer === document.querySelector(".my").textContent) {
  //     massarrfil.push(element);
  //   }
  // });
  // }
  for (let i = 0; i < massarr.length; i++) {
    if (massarr[i].owner === document.querySelector(".my").textContent) {
      console.log("cgfnmsad");
      document.querySelector("ul").append(create_new(massarr[i], true));
    }
  }
  function create_new({ name, owner, done, id }, fromDB = false) {
    inp.value = "";
    console.log(name);
    if (name == "") {
      console.log("кто такой таб");
      return;
    }
    const li = document.createElement("li");
    li.className = "li";
    li.textContent = name;
    let btn1 = document.createElement("button");
    btn1.textContent = "done";
    li.append(btn1);
    btn1.className = "btn1";

    let btn2 = document.createElement("button");
    btn2.textContent = "delete";
    li.append(btn2);
    btn2.className = "btn2";
    btn2.addEventListener(`click`, function () {
      deleteiddb(id);
      li.remove();
    });
    if (done) {
      li.style.backgroundColor = "#ffd7bf";
    }
    btn1.addEventListener(`click`, function (event) {
      event.preventDefault();
      done = true;
      ChangeTru(id);

      li.style.backgroundColor = "#ffd7bf";
    });
    let forDb = li.textContent;
    if (!fromDB) {
      inputDB(forDb.substring(0, forDb.length - 10));
    }
    return li;
  }
  //////////////////////////////////////////
  async function getComents() {
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
    // console.log(data);
    // for (let i = 0; i < data.length; i++) {
    //   let name = data[i].name;
    //   let done = data[i].done;
    //   create_new(name, done);
    // }
  }
  getComents();
  function createTodoList() {
    for (const todo of data) {
      ul.append(create_new(todo));
      console.log(todo);
    }
  }

  inp.addEventListener("input", () => {
    if (inp.value == "") {
      btn.disabled = true;
    } else {
      btn.removeAttribute("disabled");
    }
  });

  form.addEventListener("submit", (event) => {
    const li = create_new({ name: inp.value });
    if (li) {
      ul.append(li);
      btn.disabled = true;
    }
  });
}

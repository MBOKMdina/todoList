let list = [];
/*[
    {
        name: 'Khumbos plans', 
        todoList:[
            {
                name:'make dinner',
                dueDate:'2022-12-22',
                complete: false
            },
            {
                name:'Mc donalds', 
                dueDate:'2022-12-29',
                complete: true
            }]
    },
    {
        name: 'christmas',
        todoList:[
            {
                name:'turkey',
                dueDate:'2022-08-45',
                complete: false
            }]
    }];*/


document.querySelector('.js-addToDoList').addEventListener('click', ()=>
{
    document.querySelector('.js-add-procedure').innerHTML = `
        <div class="background"></div>
        <div class="ui-new-todo">
        <div class="close-contain">
            <div class="close js-close">
                <img class="x" src="images/x.svg">
            </div>
        </div>
        <div class="contents">
            <input class="todo-name js-input" placeholder="new todo list name">
            <button class="enter-button js-enter">Enter</button>
        </div>
        </div>
    `;
    document.querySelector('.js-close').addEventListener('click', ()=>
    {
        document.querySelector('.js-add-procedure').innerHTML = ``
    });

    document.querySelector('.js-enter').addEventListener('click', ()=>
    {
        let nameTodo = document.querySelector('.js-input');
        document.querySelector('.js-add-procedure').innerHTML = ``;
        addList(nameTodo.value);
        saveToStorage();
    });
    
    document.addEventListener('keydown', (event)=>
    {
        if(event.key === 'Enter')
        {
            let nameTodo = document.querySelector('.js-input');
            document.querySelector('.js-add-procedure').innerHTML = ``;
            addList(nameTodo.value);
            saveToStorage();
        }
    });
});
    
renderList();

function renderTodoList(indexMain,todoList)
{
    let todoListHTML = '';
    count = -1;
    todoList.forEach((todoObject, index) =>
    {
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        count++;
        let checkBoxId = `${indexMain}${count}`;
        const { name, time, complete} = todoObject;
        let checked = '';
        if(complete)
        {
            checked = '<img class="check" src="images/check-mark.png">';
        }
        else
        {
            
        }
        const html = `
        <div class="description js-description">${name}</div>
        <div class="time">${time}</div>
        <button class="delete-todo-button js-delete-todo-button${indexMain}">Delete</button>
        <div class="checkBox js-checkBox" data-check-id="${checkBoxId}">${checked}</div>
        `; 
        todoListHTML += html;

    });
    document.querySelector(`.js-todo-list${indexMain}`).innerHTML = todoListHTML;
    document.querySelectorAll(`.js-delete-todo-button${indexMain}`).forEach((deleteButton, index)=>
    {
        deleteButton.addEventListener('click', ()=>
        {
            todoList.splice(index, 1);
            renderTodoList(indexMain, todoList);
            saveToStorage();
        });
    });
    document.querySelectorAll('.js-checkBox').forEach((checkBox)=>
    {
        let specified = checkBox.dataset.checkId;
        let listIndex = specified.substring(0, 1);
        let checkBoxIndex = specified.substring(specified.length - 1);
        checkBox.addEventListener('click',()=>
        {
            if(checkBox.innerHTML === '')
            {
                list[listIndex].todoList[checkBoxIndex].complete = true;
                checkBox.innerHTML =`
                <img class="check" src="images/check-mark.png">
                `;
            }
            else
            {
                list[listIndex].todoList[checkBoxIndex].complete = false;
                checkBox.innerHTML = '';
            }
            saveToStorage();
        });
    });

    document.querySelectorAll('.js-description').forEach((description)=>
    {
        description.addEventListener('click',()=>
        {
            console.log(description);
            let enhanced = description.innerHTML;
            document.querySelector('.js-enhanced-description').innerHTML = `
                <div class="background"></div>
                <div class="enhanced-description-ui">
                    <div><img class="x2 js-x2" src="images/x.svg"></div>
                    ${enhanced}
                </div>
            `;
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-description').innerHTML = ``;
            })
        });
    });
};

/*document.querySelector('.js-add-todo-button').addEventListener('click', ()=>
{
    addTodo();
});*/

function addTodo(index, todoList)
{
    const inputElement = document.querySelector(`.js-name-input${index}`);
    const name = inputElement.value;

    const dateInputElement = document.querySelector(`.js-due-date-input${index}`);
    const time = dateInputElement.value;

    todoList.push(
    {
        //name: name, 
        //dueDate: dueDate
        name,
        time,
        complete: false
    });

    
    
    inputElement.value = '';

    /*renderTodoList(index, todoList);*/
}

function  renderList()
{
    let listHTML = '';
    let name = '';
    let todoList = [];
    let objectList = [];
    let count = 0;
    list.forEach((listObject, index)=>
    {
        name = listObject.name;
        todoList = listObject.todoList;
        let html = `
        <div class="todo-block">
            <p>${name}</p>
            <div class="todo-input-grid">
                <input placeholder="Task" class="js-name-input${index} name-input">
                <input placeholder="Time" class="js-due-date-input${index} due-date-input">
                <button class="add-todo-button js-add-todo-button">Add</button>
                <div class="subtractList js-subtract-list"><img class="subtract" src="images/subtraction.png"></div>
            </div>
            <div class="js-todo-list${index} todo-grid"></div>
        </div>`;
        document.querySelector('.js-block').innerHTML = html;
        renderTodoList(index, todoList);
        listHTML += document.querySelector('.js-block').innerHTML;
    });
    document.querySelector('.js-block').innerHTML = listHTML;
    document.querySelectorAll('.js-add-todo-button').forEach((addbtn, indexMain)=>
    {
        addbtn.addEventListener('click', ()=>
        {
            addTodo(indexMain, list[indexMain].todoList);
            renderList();
            saveToStorage(); 
        });
        document.querySelectorAll(`.js-delete-todo-button${indexMain}`).forEach((deleteButton, index)=>
        {
            deleteButton.addEventListener('click', ()=>
            {
                list[indexMain].todoList.splice(index, 1);
                renderList();
                saveToStorage();
            });
        });
    });
    document.querySelectorAll('.js-subtract-list').forEach((subtractbtn, index)=>
    {
        subtractbtn.addEventListener('click',()=>
        {
            list.splice(index, 1);
            renderList();
            saveToStorage();
        });
    });
    /*document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index)=>
    {
        deleteButton.addEventListener('click', ()=>
        {
            todoList.splice(index, 1);
            renderTodoList(index, todoList);
        });
    });*/
    document.querySelectorAll('.js-checkBox').forEach((checkBox)=>
    {
        let specified = checkBox.dataset.checkId;
        let listIndex = specified.substring(0, 1);
        let checkBoxIndex = specified.substring(specified.length - 1);
        checkBox.addEventListener('click',()=>
        {
            if(checkBox.innerHTML === '')
            {
                list[listIndex].todoList[checkBoxIndex].complete = true;
                checkBox.innerHTML =`
                <img class="check" src="images/check-mark.png">
                `;
            }
            else
            {
                list[listIndex].todoList[checkBoxIndex].complete = false;
                checkBox.innerHTML = '';
            }
            saveToStorage();
        });
    });

    document.querySelectorAll('.js-description').forEach((description)=>
    {
        description.addEventListener('click',()=>
        {
            console.log(description);
            let enhanced = description.innerHTML;
            document.querySelector('.js-enhanced-description').innerHTML = `
                <div class="background"></div>
                <div class="enhanced-description-ui">
                    <div><img class="x2 js-x2" src="images/x.svg"></div>
                    ${enhanced}
                </div>
            `;
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-description').innerHTML = ``;
            })
        });
    });
};

function addList(todoName)
{
    list.push(
    {
        name: todoName,
        todoList: []
    });
    renderList();
}

function saveToStorage()
{
    console.log('Saved to local storage');
}
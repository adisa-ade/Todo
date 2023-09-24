// INPUTS
const light = document.querySelector('#light')
const dark = document.querySelector('#dark')
const body = document.querySelector('body')
const input = document.querySelector('.add-task input')
const list = document.querySelector('.details')
const ul = document.querySelector('.list-container')
const count = document.getElementById('count')
const clearCompleted = document.getElementById('clear-completed')
const addTaskButton = document.querySelector('button')
const listFooter = document.querySelector('.list-footer')
const status1 = document.querySelector('.status')
const mobileDarkImage = document.querySelector('.mobile-dark-image')
const mobileLightImage = document.querySelector('.mobile-light-image')
const desktopDarkImage = document.querySelector('.desktop-dark-image')
const desktopLightImage = document.querySelector('.desktop-light-image')
let screen = window.screen.width
const li = document.querySelectorAll('li')
const all1 = document.querySelector('#status #all')
const active1 = document.querySelector('#status #active')
const completed1 = document.querySelector('#status #completed')

const all2 = document.querySelector('.desktop-status #all')
const active2 = document.querySelector('.desktop-status #active')
const completed2 = document.querySelector('.desktop-status #completed')

// FUNCTION CALL
light.addEventListener('click',lightMode)
dark.addEventListener('click',darkMode)
input.addEventListener('keydown', (e) => {
    if(e.code === 'Enter'){
        addTask()
    }
})
addTaskButton.addEventListener('click', addTask)
clearCompleted.addEventListener('click', clearCompletedTask)

all1.addEventListener('click', allTask)
active1.addEventListener('click', activeTask)
completed1.addEventListener('click', completedTask)

all2.addEventListener('click', allTask)
active2.addEventListener('click', activeTask)
completed2.addEventListener('click', completedTask)


// LIGHT MODE
function lightMode() {
    body.style.backgroundColor = 'hsl(233, 11%, 84%)'
    input.style.backgroundColor = 'white'
    input.style.color = 'grey'
    addTaskButton.style.backgroundColor = 'white'
    list.style.backgroundColor = 'white'
    list.style.color = 'grey'
    status1.style.backgroundColor = 'white'
    status1.style.color = 'hsl(234, 11%, 52%)'
    listFooter.style.color = 'hsl(234, 11%, 52%)'
    dark.style.display = 'block'
    light.style.display = 'none'

    if (screen >= 768){
    desktopDarkImage.style.display = 'none'
    desktopLightImage.style.display = 'block'    
    }
    else if(screen < 800){ 
    mobileDarkImage.style.display = 'none'
    mobileLightImage.style.display = 'block'
    }
}
// DARK MODE
function darkMode() {
    body.style.backgroundColor = 'hsl(235, 21%, 11%)'
    input.style.backgroundColor = 'hsl(235, 24%, 19%)'
    addTaskButton.style.backgroundColor = 'hsl(235, 24%, 19%)'
    list.style.backgroundColor = 'hsl(235, 24%, 19%)'
    status1.style.backgroundColor = 'hsl(235, 24%, 19%)'
    dark.style.display = 'none'
    light.style.display = 'block'
    if (screen >= 768){
        desktopDarkImage.style.display = 'block'
        desktopLightImage.style.display = 'none'    
        }
        else if(screen < 800){
        mobileDarkImage.style.display = 'block'
        mobileLightImage.style.display = 'none'
        }
}

// ADD TASK TO TODO LIST

function addTask () {
    if(input.value != ''){
        const task = document.createElement('li')
        task.classList = 'new-task'
        task.textContent = input.value
        ul.appendChild(task)        
        let span = document.createElement('span')
        span.innerHTML = '\u00d7'
        task.appendChild(span)
        remainingItems()
    }    
    else{
        alert ('Cannot add empty task')
    }
    input.value = ''
    saveData()
}

// MARKS COMPLETED TASK, ALSO USED TO REMOVE TASK (COMPLETED OR ACTIVE) FROM LIST
ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked')
    e.target.classList.toggle('new-task')
    saveData()
    }
    else if(e.target.tagName === 'SPAN'){
    e.target.parentElement.remove()
    remainingItems()
    saveData()
    }
}, false)

// REMOVES COMPLETED TASK FROM LIST
function clearCompletedTask(){
    const items = document.querySelectorAll('.checked')
    items.forEach((item) => {
        item.remove()
    })
    remainingItems()
    saveData()
}
// UPDATE REMAINING TASK
function remainingItems(){
    const itemsRemaining = document.querySelectorAll('ul li')
    count.innerHTML = itemsRemaining.length + ` item(s) remaining`
}

// SAVES THE TASK LOCALLY
function saveData(){
    localStorage.setItem('data', ul.innerHTML)
}


// DISPLAY ALL TASKS
function showData(){
    ul.innerHTML = localStorage.getItem('data')
    remainingItems()
}
showData()

// SWITCH STATUS BETWEEN ALL, ACTIVE AND COMPLETED TASK
function allTask(){
    const items = document.querySelectorAll('li')
    for(let i = 0; i < items.length; i++){
    items[i].style.display = 'block'
    }
}
function activeTask(){
    const items = document.querySelectorAll('li')
    for(let i = 0; i < items.length; i++){
        items[i].style.display = 'block'
        if(items[i].classList.contains('checked')){
        items[i].style.display = 'none'
    }  
}
}
function completedTask(){
    const items = document.querySelectorAll('li')
    const item2 = document.querySelectorAll('.checked')
    for(let i = 0; i < items.length; i++){
        items[i].style.display = 'block'
        if(item2.length >= 1 && items[i].classList.contains('new-task')){
        items[i].style.display = 'none'
        }
    }  
}

// Getting required DOM elements
const start_button = document.getElementById("start-button")
const start_menu = document.getElementById("start-menu")

const title_bar = document.getElementById('title-bar')
const explorer_button = document.getElementById('explorer-button')
const explorer_button2 = document.getElementById('explorer-button-2')
const explorer_window = document.getElementById('explorer-window')
const close_button = document.getElementById('close')

const nwResizer = document.getElementById("nw-resize")
const neResizer = document.getElementById("ne-resize")
const swResizer = document.getElementById("sw-resize")
const seResizer = document.getElementById("se-resize")
const resizers = document.getElementsByClassName("resizer")

// Making some variables
var draggingWindow = false
var currentWindowPos
var currentMousePos

var isMaximized = false
var defaultWindowPos
var defaultWindowSize

var resizing = false
var currentMousePos_Resize
var currentResizer

// Defining Functions
function openStartMenu() {
    start_menu.classList.toggle('active')
}

function openExplorer() {
    explorer_window.classList.toggle('active')
    start_menu.classList.remove('active')
}

function closeExplorer() {
    explorer_window.classList.remove('active')
}

function startDragWindow(e) {
    draggingWindow = true
    currentWindowPos = [explorer_window.offsetLeft, explorer_window.offsetTop]
    currentMousePos = [e.clientX, e.clientY]
}

function dragWindow(e) {
    if (!draggingWindow) { return };
    explorer_window.style.left = `${currentWindowPos[0] + (e.clientX - currentMousePos[0])}px`
    explorer_window.style.top = `${currentWindowPos[1] + (e.clientY - currentMousePos[1])}px`

}

function stopDragWindow() {
    draggingWindow = false
}

function maxWidthHeight(width, height) {
    if (explorer_window.offsetWidth < width) {
        explorer_window.style.width = width + "px"
        resizing = false
    }

    if (explorer_window.offsetHeight < height) {
        explorer_window.style.height = height + "px"
        resizing = false
    }

}


start_button.addEventListener('click', openStartMenu)
explorer_button.addEventListener('click', openExplorer)
explorer_button2.addEventListener('click', openExplorer)
title_bar.addEventListener('mousedown', startDragWindow)
document.addEventListener('mousemove', dragWindow)
title_bar.addEventListener('mouseup', stopDragWindow)
close_button.addEventListener('click', closeExplorer)

explorer_window.addEventListener('click', () => {
    start_menu.classList.remove('active')
})

for (const resizer of resizers) {
    resizer.addEventListener("mousedown", (e) => {
        currentResizer = e.target
        resizing = true
        currentMousePos_Resize = [e.clientX, e.clientY]
    })

    window.addEventListener("mouseup", () => {
        resizing = false
    })

    window.addEventListener("mousemove", (e) => {
        if (!resizing) { return; }
        maxWidthHeight(300, 300)
        if (currentResizer.classList.contains("n-resize")) {
            explorer_window.style.height = `${explorer_window.offsetHeight - (e.clientY - currentMousePos_Resize[1])}px`

            explorer_window.style.top = `${explorer_window.offsetTop + (e.clientY - currentMousePos_Resize[1])}px`
        }

        else if (currentResizer.classList.contains("nw-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth - (e.clientX - currentMousePos_Resize[0])}px`
            explorer_window.style.height = `${explorer_window.offsetHeight - (e.clientY - currentMousePos_Resize[1])}px`

            explorer_window.style.left = `${explorer_window.offsetLeft + (e.clientX - currentMousePos_Resize[0])}px`
            explorer_window.style.top = `${explorer_window.offsetTop + (e.clientY - currentMousePos_Resize[1])}px`
        }

        else if (currentResizer.classList.contains("e-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth + (e.clientX - currentMousePos_Resize[0])}px`
        }

        else if (currentResizer.classList.contains("ne-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth + (e.clientX - currentMousePos_Resize[0])}px`
            explorer_window.style.height = `${explorer_window.offsetHeight - (e.clientY - currentMousePos_Resize[1])}px`

            explorer_window.style.top = `${explorer_window.offsetTop + (e.clientY - currentMousePos_Resize[1])}px`
        }

        if (currentResizer.classList.contains("s-resize")) {
            explorer_window.style.height = `${explorer_window.offsetHeight + (e.clientY - currentMousePos_Resize[1])}px`
        }

        else if (currentResizer.classList.contains("sw-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth - (e.clientX - currentMousePos_Resize[0])}px`
            explorer_window.style.height = `${explorer_window.offsetHeight + (e.clientY - currentMousePos_Resize[1])}px`

            explorer_window.style.left = `${explorer_window.offsetLeft + (e.clientX - currentMousePos_Resize[0])}px`
        }

        else if (currentResizer.classList.contains("w-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth - (e.clientX - currentMousePos_Resize[0])}px`

            explorer_window.style.left = `${explorer_window.offsetLeft + (e.clientX - currentMousePos_Resize[0])}px`
        }

        else if (currentResizer.classList.contains("se-resize")) {
            explorer_window.style.width = `${explorer_window.offsetWidth + (e.clientX - currentMousePos_Resize[0])}px`
            explorer_window.style.height = `${explorer_window.offsetHeight + (e.clientY - currentMousePos_Resize[1])}px`
        }

        currentMousePos_Resize = [e.clientX, e.clientY]
    })
}

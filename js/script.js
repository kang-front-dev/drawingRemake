
let wrapperContent = document.querySelector('.wrapper-content')
setWidth()
function setWidth() {
    let height = wrapperContent.offsetHeight
    let width = wrapperContent.offsetWidth
    let cellSize = Math.floor(height / 45)
    let horizontalCellAmount = Math.floor(width / cellSize)
    wrapperContent.style.gridTemplateColumns = `repeat(${horizontalCellAmount},1fr)`

}

let cellAmount = 4320
generateCells(cellAmount)
function generateCells(amount) {
    if (amount > 0) {
        let newCell = document.createElement('div')
        newCell.className = 'cell'
        wrapperContent.appendChild(newCell)
        generateCells(--amount)


    } else {
        return
    }
}

let colorSection = document.querySelector('.colors-section')

const colors = {
    0: '#1F1D36',
    1: '#3F3351',
    2: '#000000',
    3: '#6B4F4F',
    4: '#87AAAA',
    5: '#9C19E0',
    6: '#2F86A6',
    7: '#34BE82',
    8: '#DFD8CA',
    9: '#FBF3E4',
    10: '#FF5151',

}
let length = Object.keys(colors).length
let startNum = 0
generateColors(length)
function generateColors() {
    if (startNum < length) {
        let newColor = document.createElement('div')
        newColor.className = 'color'
        newColor.style.backgroundColor = `${colors[startNum]}`
        colorSection.appendChild(newColor)
        generateColors(++startNum)
    } else {
        return
    }

}
let customColorBtn = document.querySelector('.custom-color')
let customColorPanel = document.querySelector('.custom-color-panel')
let colorSelected;
colorSection.addEventListener('click', (e) => {
    if (!e.target.classList.contains('color-active') && e.target.classList.contains('color')) {
        colorClearActives()
        e.target.classList.add('color-active')
        colorSelected = e.target.style.backgroundColor
        eraserState = false
        eraserBtn.className = 'btn eraser'
        if (customColorPanel.classList.contains('custom-color-panel-active')) {
            customColorPanel.classList.remove('custom-color-panel-active')
        }
        if (e.target == customColorBtn) {
            customColorPanel.classList.add('custom-color-panel-active')

        }
    }
})

function colorClearActives() {
    let colors = document.querySelectorAll('.color')
    colors.forEach((item) => {
        item.className = 'color'
    })
}

let mouseDown = false
window.addEventListener('mousedown', (e) => {
    mouseDown = true
})
window.addEventListener('mouseup', (e) => {
    mouseDown = false
})
wrapperContent.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        if (colorSelected) {
            if (eraserState) {
                e.target.style.backgroundColor = '#fff'
                e.target.className = 'cell'
            } else {
                e.target.style.backgroundColor = colorSelected
                if (!e.target.classList.contains('cell-active')) {
                    e.target.classList.add('cell-active')

                }
            }

        }

    }
})
wrapperContent.addEventListener('click', (e) => {
    if (colorSelected && e.target != wrapperContent) {
        if (!eraserState) {
            e.target.style.backgroundColor = colorSelected
            if (!e.target.classList.contains('cell-active')) {
                e.target.classList.add('cell-active')

            }
        } else {
            e.target.style.backgroundColor = '#fff'
            e.target.className = 'cell'
        }

    }
})

let cleanBtn = document.querySelector('.clean-btn')
cleanBtn.addEventListener('click', (e) => {
    let cells = document.querySelectorAll('.cell-active')
    cells.forEach((item) => {
        item.className = 'cell'
        item.style.backgroundColor = '#fff'
    })
})

let eraserBtn = document.querySelector('.eraser')
let eraserState = false
eraserBtn.addEventListener('click', (e) => {
    if (eraserState) {
        eraserState = false
        eraserBtn.className = 'btn eraser'

    } else {
        eraserState = true
        eraserBtn.className = 'btn eraser eraser-active'
    }
})

let inputRangeRed = document.querySelector('.input-red')
let inputRangeGreen = document.querySelector('.input-green')
let inputRangeBlue = document.querySelector('.input-blue')
let inputPreview = document.querySelector('.input-preview')
let customColor = document.querySelector('.custom-color')

if (!localStorage.getItem('customColor')) {
    localStorage.setItem('customColor', '#FFFFFF')
}




let redColor = 255
let greenColor = 255
let blueColor = 255

if (localStorage.getItem('redCode')) {
    redColor = localStorage.getItem('redCode');
    console.log(redColor);
    console.log('Took from local(red)');
} else {
    localStorage.setItem('redCode', redColor)
}

if (localStorage.getItem('greenCode')) {
    greenColor = localStorage.getItem('greenCode')
    console.log(greenColor);
    console.log('Took from local(green)');
} else {
    localStorage.setItem('greenCode', greenColor)
}

if (localStorage.getItem('blueCode')) {
    blueColor = localStorage.getItem('blueCode')
    console.log(blueColor);
    console.log('Took from local(blue)');
} else {
    localStorage.setItem('blueCode', blueColor)
}


progressStart(inputRangeRed)
progressStart(inputRangeGreen)
progressStart(inputRangeBlue)

function progressStart(el) {

    if (el == inputRangeRed) {
        el.value = Number(redColor)
        if (el.value > 70) {
            el.style.background = `linear-gradient(to right, rgb(${el.value}, 0, 0) 0%, rgb(${el.value}, 0, 0) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
        } else {
            el.style.background = `linear-gradient(to right, rgb(${el.value}, 0, 0) 0%, rgb(${el.value}, 0, 0) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(el.value / 2.55)}%, rgb(211, 211, 211) 100%)`
        }
    } else if (el == inputRangeGreen) {
        el.value = Number(greenColor)
        if (el.value > 70) {
            el.style.background = `linear-gradient(to right, rgb(0, ${el.value}, 0) 0%, rgb(0, ${el.value}, 0) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
        } else {
            el.style.background = `linear-gradient(to right, rgb(0, ${el.value}, 0) 0%, rgb(0, ${el.value}, 0) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(el.value / 2.55)}%, rgb(211, 211, 211) 100%)`
        }
    } else {
        el.value = Number(blueColor)
        if (el.value > 70) {
            el.style.background = `linear-gradient(to right, rgb(0, 0, ${el.value}) 0%, rgb(0, 0, ${el.value}) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
        } else {
            el.style.background = `linear-gradient(to right, rgb(0, 0, ${el.value}) 0%, rgb(0, 0, ${el.value}) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(el.value / 2.55)}%, rgb(211, 211, 211) 100%)`
        }
    }
    if (localStorage.getItem('customColor')) {
        customColor.style.backgroundColor = localStorage.getItem('customColor')
        inputPreview.style.backgroundColor = localStorage.getItem('customColor')
    } else {
        customColor.style.backgroundColor = '#FFFFFF'
        inputPreview.style.backgroundColor = '#FFFFFF'
    }



    el.addEventListener('input', function (ev) {

        if (ev.target == inputRangeRed) {
            if (ev.target.value > 70) {
                ev.target.style.background = `linear-gradient(to right, rgb(${ev.target.value}, 0, 0) 0%, rgb(${el.value}, 0, 0) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(ev.target.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
            } else {
                ev.target.style.background = `linear-gradient(to right, rgb(${ev.target.value}, 0, 0) 0%, rgb(${el.value}, 0, 0) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(ev.target.value / 2.55)}%, rgb(211, 211, 211) 100%)`
            }
            redColor = ev.target.value
            localStorage.redCode = ev.target.value
        } else if (ev.target == inputRangeGreen) {
            if (ev.target.value > 70) {
                ev.target.style.background = `linear-gradient(to right, rgb(0, ${ev.target.value}, 0) 0%, rgb(0, ${el.value}, 0) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(ev.target.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
            } else {
                ev.target.style.background = `linear-gradient(to right, rgb(0, ${ev.target.value}, 0) 0%, rgb(0, ${el.value}, 0) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(ev.target.value / 2.55)}%, rgb(211, 211, 211) 100%)`
            }
            greenColor = ev.target.value
            localStorage.greenCode = ev.target.value
        } else {
            if (ev.target.value > 70) {
                ev.target.style.background = `linear-gradient(to right, rgb(0, 0, ${ev.target.value}) 0%, rgb(0, 0, ${el.value}) ${(el.value / 2.55) - 2}%, rgb(211, 211, 211) ${(ev.target.value / 2.55) - 2}%, rgb(211, 211, 211) 100%)`
            } else {
                ev.target.style.background = `linear-gradient(to right, rgb(0, 0, ${ev.target.value}) 0%, rgb(0, 0, ${el.value}) ${(el.value / 2.55)}%, rgb(211, 211, 211) ${(ev.target.value / 2.55)}%, rgb(211, 211, 211) 100%)`
            }
            blueColor = ev.target.value
            localStorage.blueCode = ev.target.value
        }
        localStorage.customColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`

        inputPreview.style.backgroundColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`
        customColor.style.backgroundColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`
        colorSelected = `rgb(${redColor}, ${greenColor}, ${blueColor})`
    })
}

let colorTagInput = document.querySelector('.input-color-tag')
let colorTagBtn = document.querySelector('.input-color-tag-btn')
document.addEventListener('keydown', (e) => {

    if (e.key == 'Enter') {
        if (colorTagInput.value.length == 7) {
            inputPreview.style.backgroundColor = colorTagInput.value
            customColor.style.backgroundColor = colorTagInput.value
            colorSelected = colorTagInput.value
        } else {
            alert('Write correct color')
        }
    }

})
colorTagBtn.addEventListener('click', () => {
    if (colorTagInput.value.length == 7) {
        inputPreview.style.backgroundColor = colorTagInput.value
        customColor.style.backgroundColor = colorTagInput.value
        colorSelected = colorTagInput.value
        localStorage.customColor = colorTagInput.value
    } else {
        alert('Write correct color')
    }
})


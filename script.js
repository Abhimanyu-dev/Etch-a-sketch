const container = document.querySelector('.container')
const canvas = document.querySelector('.canvas')
const container_height = container.offsetHeight
const container_width = container.offsetWidth

size = document.querySelector('#slider').value
draw = false
start_draw = false
rgb = false
grid_size = 0


label = document.querySelector('.label_slider')
label.textContent = size + 'x' + size

var side 
 
if(container_height > container_width){
    side = Math.floor((container_width/1.5)-(container_width/1.5)%10)
}
else{
    side = Math.floor((container_height/1.5)-(container_height/1.5)%10)
}

canvas.style.height = side+'px'
canvas.style.width = side+'px'

draw_canvas()

function draw_canvas(){
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild)
    }
    size = document.querySelector('#slider').value

    row_pixel = []
    rows = size
    columns = size
    grid_size = (side+4)/size
    console.log(rows)
    for(i=0; i<columns; i++){
        pixel = document.createElement('div')
        pixel.setAttribute('class', 'pixel')
        pixel.setAttribute('draggable', 'false')
        pixel.setAttribute('style', ' padding:none; margin:none; height:'+grid_size+'px; width:'+grid_size+'px; border-radius:20%')
        row_pixel.push(pixel)
    }

    row = document.createElement('div')
    row.setAttribute('id', 'row')

    for(i=0; i<columns; i++){
        row.appendChild(row_pixel[i])
    }

    row_container = []

    for(i=0; i<columns; i++){
        row_container.push(row)
    }

    for(i=0; i<rows; i++){
        canvas.appendChild(row_container[i].cloneNode(true))
    }
    label = document.querySelector('.label_slider')
    label.textContent = size + 'x' + size
   
    pixel = document.querySelectorAll('.pixel')
    for(i=0; i<pixel.length; i++){
        pixel[i].setAttribute('onmouseover', 'highlight(this)')
    }


    toggle_grid(false)
    draw_start(false)
    rgb_btn(false)
    clear_screen()
}

function highlight(element){
    color = document.querySelector('#colorpicker').value
    if(rgb){
        red = Math.floor(Math.random()*256)
        green = Math.floor(Math.random()*256)
        blue = Math.floor(Math.random()*256)
        color = 'rgb('+red+','+green+','+blue+')'
        
    }
    if(draw)
    element.style.backgroundColor = color
}

function clear_screen(){
    pixel = document.querySelectorAll('.pixel')
    for(i=0; i<pixel.length; i++){
        pixel[i].style.backgroundColor = '#191c29'
    }
}   


function rgb_btn(on=true){
    flag = false
    btn = document.querySelector('.rgb')
    if(btn.style.backgroundColor == 'black' && on){
        btn.setAttribute('style', 'background-color:white; zoom:1.1')
        rgb = true
    }
    else{
        btn.setAttribute('style', 'background-color:black; color: white')
        rgb = false
    }
}

function mouseDown(){
    if(start_draw)
    draw = true
}

function mouseUp(){
    draw = false
}

function toggle_grid(grid=true){
    flag = false
    pixel = document.querySelectorAll('.pixel')
    btn = document.querySelector('.toggle-grid')
    if(btn.style.backgroundColor == 'black' && grid){
        btn.setAttribute('style', 'background-color:white; zoom:1.1')
        flag = true
    }
    else{
        btn.setAttribute('style', 'background-color:black; color:white')
        flag = false
    }
    if(flag){
        for(i=0; i<pixel.length; i++){
            pixel[i].setAttribute('style','height: '+(grid_size-2)+'px; width:'+(grid_size-2)+'px; border:1px solid grey; border-radius:20%')
        }
    }
    else{
        for(i=0; i<pixel.length; i++){
            pixel[i].setAttribute('style','height: '+grid_size+'px; width:'+grid_size+'px;')
        }
    }
}

function draw_start(on=true){
    btn = document.querySelector('.draw')
    if(btn.style.backgroundColor == 'black' && on){
        btn.setAttribute('style', 'background-color:white; zoom:1.1')
        start_draw = true
    }
    else{
        btn.setAttribute('style', 'background-color:black; color:white')
        start_draw = false
    }
}




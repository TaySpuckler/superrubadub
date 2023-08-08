var duck = document.getElementById("duck")
duck.style.left = "128px"
duck.style.top = "0px"

var mouse;

setInterval(function() {
    if (mouse){
        let x = parseInt(duck.style.left.split("p")[0])
        let y = parseInt(duck.style.top.split("p")[0])

        
        
        let distx = Math.abs((x-mouse.pageX)*0.005);
        let disty = Math.abs((y-mouse.pageY)*0.005);

        document.getElementById("info").innerHTML = x

        let xdir = Math.floor(x) == Math.floor(mouse.pageX) ? 0 : (x < mouse.pageX ? 2*distx : -2*distx)
        let ydir = Math.floor(y) == Math.floor(mouse.pageY) ? 0 : (y < mouse.pageY ? 2*disty : -2*disty)

        duck.style.left = x + (xdir) + "px"
        duck.style.top = y + (ydir) + "px"
        //duck.style.top = y + disty
    }
}, 10);

function tellPos(p){
    mouse = p;
}
addEventListener('mousemove', tellPos, false);
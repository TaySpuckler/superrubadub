let table = document.getElementById("hiscores");
let data = []
var current_level = 0

var audio = new Audio('sound/select.ogg');
audio.volume = 0.1; 

loadData();

function loadData(){
    let level = []
    fetch("data.csv")
    .then((res) => res.text())
    .then((text) => {
        let i = 0
        text.split("\n").forEach(line => {
            if (i==0){
                i++;
                return;
            }
            level.push(line)
            i++
            if (i>10){
                data.push(level);
                level = [];
                i = 0;
            }
        })
        if (window.location.hash){
            loadLevel(parseInt(location.hash.substring(1)));
        }else{
            loadLevel(0);
        }
        console.log(data)

        document.getElementById("hiscores").style.display = "block";
        document.getElementById("load").style.display = "none";
    })
    .catch((e) => console.error(e));
}

function loadLevel(level){

    if ((level > 19) || (level < 0)){
        return
    }

    current_level = level
    window.location.hash = current_level

    document.getElementById("level").innerHTML = (level+1)<10 ? "0" + (level+1) : level+1
    audio.play();

    for(let i = 1;i<table.rows.length;){
        table.deleteRow(i);
    }

    for (let i = 0; i < 10; i++) {

        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = i+1
        cell2.innerHTML = '<span class="flag-icon flag-icon-'+ data[level][i].split(",")[0] +'"></span> ' + data[level][i].split(",")[1]
        cell3.innerHTML = '&nbsp;&nbsp;00:' + data[level][i].split(",")[2]

        if (data[level][i].split(",").length>3){
            cell4.innerHTML = '<a href='+data[level][i].split(",")[3]+'><i class="fa fa-youtube-play" style="font-size:24px;color:red"></i></a>'
        }
    }

    // if (level==12){
    //     let row = table.insertRow(-1);
    //     let cell = row.insertCell(0);
    //     cell.innerHTML = '+ 53 more'
    //     cell.colSpan = '4'
    //     cell.style = "text-align:center"
    // }
}
var app = new Vue({
  el: '#screen',
  data: {
    cpu_hp: 5,
    player_hp: 5,
    move_state: 'r'
  }
})


// cpu, player action imgs
var cpu_action_img = document.getElementById("cpu-action-img");
var player_action_img = document.getElementById("player-action-img");

function rMove() {
  player_action_img.setAttribute("src", "images/rock.png");
  
  // randomize cpu move
  var cpu_move = Math.floor(Math.random() * 3);

  if (cpu_move == 0) {
    // rock
    cpu_action_img.setAttribute("src", "images/rock.png")

    // draw
    animate("draw")

  } else if (cpu_move == 1) {
    // paper
    cpu_action_img.setAttribute("src", "images/paper.png")
    
    // lose
    animate("lose")
  } else {
    // scissors
    cpu_action_img.setAttribute("src", "images/scissors.png")

    //win
    animate("win")
  }
}

function pMove() {
  player_action_img.setAttribute("src", "images/paper.png")

  var cpu_move = Math.floor(Math.random() * 3);

  if (cpu_move == 0) {
    // rock
    cpu_action_img.setAttribute("src", "images/rock.png")

    // win
    animate("win")
  } else if (cpu_move == 1) {
    // paper
    cpu_action_img.setAttribute("src", "images/paper.png")

    // draw
    animate("draw")

  } else {
    // scissors
    cpu_action_img.setAttribute("src", "images/scissors.png")

    // lose
    animate("lose")
  }
}

function sMove() {
  player_action_img.setAttribute("src", "images/scissors.png")
  var cpu_move = Math.floor(Math.random() * 3);

  if (cpu_move == 0) {
    // rock
    cpu_action_img.setAttribute("src", "images/rock.png")

    // lose
    animate("lose")
  } else if (cpu_move == 1) {
    // s v paper
    cpu_action_img.setAttribute("src", "images/paper.png")

    // win
    animate("win")
  } else {
    // s v scissors
    cpu_action_img.setAttribute("src", "images/scissors.png")

    // draw
    animate("draw")
  }
}

/* ANIMATIONS */
function fadeAnimate(id) {
  var elem = document.getElementById(id)
  var opac = 100;
  var rep = 1;
  var id = setInterval(frame, 7);
  function frame() {
    if (opac == 0) {
      clearInterval(id);
    } else {
      opac--;
      elem.style.opacity = opac / 100;
    }
  }
}

function damageAnimate(elem_id) {
  var elem = document.getElementById(elem_id)
  var opac = 100;
  var rep = 3;
  var id = setInterval(frame, 7);
  function frame() {
    if (opac == 0) {
      rep--;
      if (rep == 0) {
        elem.style.opacity = 1.0;
        clearInterval(id);

        // deduct damage
        if (elem_id=="cpu-img") {
          app.cpu_hp--;
        } else if (elem_id=="player-img") {
          app.player_hp--;
        }

        // winning sequence
        if (app.cpu_hp == 0) {
          winAnimate("player");
        } else if (app.player_hp == 0) {
          winAnimate("cpu");
        }
      } 
      opac = 100;
    } else {
      opac--;
      elem.style.opacity = opac / 100;
    }
  }
}

function winAnimate(who) {
  if (who == "player") {
    fadeAnimate("cpuhpbar")
    fadeAnimate("cpu-action-img")
    fadeAnimate("cpu-img")

    fadeAnimate("table2")
    document.getElementById("tablediag").innerHTML = '<p>YOU WIN!</p>'
  } else {
    // cpu
    fadeAnimate("playerhpbar")
    fadeAnimate("player-action-img")
    fadeAnimate("player-img")

    fadeAnimate("table2")
    document.getElementById("tablediag").innerHTML = '<p>YOU LOSE!</p>'
  }
}

function animate(outcome) {
  var cpu_action_img = document.getElementById("cpu-action-img")
  var player_action_img = document.getElementById("player-action-img")

  // set display: on
  player_action_img.style.display = "inline"
  cpu_action_img.style.display = "inline"

  // animate
  function playerAnimate() {
    var elem = document.getElementById("player-action-img")
    var pos = 0;
    var id = setInterval(frame, 20);
    function frame() {
      if (pos == 50) {
        clearInterval(id);

        // damage animate after atk 
        if (outcome == "win") {
          damageAnimate("cpu-img");
        } else if (outcome == "lose") {
          damageAnimate("player-img");
        }

      } else {
        pos++;
        elem
        poss = 50 - pos
        elem.style.top = poss + "px"; 
        elem.style.left = pos + "px"; 
      }
    }
  }

  // animate
  function cpuAnimate() {
    var elem = document.getElementById("cpu-action-img")
    var pos = 0;
    var id = setInterval(frame, 20);
    function frame() {
      if (pos == 50) {
        clearInterval(id);
      } else {
        pos++;
        elem
        poss = 150 - pos
        elem.style.top = pos + "px"; 
        elem.style.left = poss + "px"; 
      }
    }
  }

  playerAnimate()
  cpuAnimate()
}


/* KEY EVENTS */
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if (app.move_state == 'r') {
          app.move_state = 's';
        }  else if (app.move_state == 'p') {

        } else if (app.move_state == 's') {
          app.move_state = 'r';
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (app.move_state == 'r') {
          app.move_state = 's';
        }  else if (app.move_state == 'p') {
          
        } else if (app.move_state == 's') {
          app.move_state = 'r';
        }        
    }
    else if (e.keyCode == '37') {
       // left arrow
       if (app.move_state == 'r') {
        app.move_state = 'p';
      }  else if (app.move_state == 'p') {
        app.move_state = 'r';
      } else if (app.move_state == 's') {
      }       
    }
    else if (e.keyCode == '39') {
       // right arrow
       if (app.move_state == 'r') {
        app.move_state = 'p';
      }  else if (app.move_state == 'p') {
        app.move_state = 'r';
      } else if (app.move_state == 's') {
      }           
    }
    else if (e.keyCode == '13') {
      // enter
      if (app.move_state == 'r') {
        rMove();
      }  else if (app.move_state == 'p') {
        pMove();
      } else if (app.move_state == 's') {
        sMove();
      }             
    }

}


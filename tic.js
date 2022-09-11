let readline;
let inNode = true;
if (typeof process !== 'undefined') {
 readline = require("readline");
 readline.emitKeypressEvents(process.stdin);
 process.stdin.setRawMode(true);
 process.stdin.on('keypress', (str, key) => {
   if (key.ctrl && key.name === 'c') {
     process.exit();
   } else {
       if(turn){
         if(combo.row){
             combo.col = key.name
             turn = false
             game.move(combo)
          }else{
            combo.row = key.name
          }
       }else{
           console.log("wait your turn")
       }
      
    
   }
 });
 
}else{
   inNode = false;

}
// console.log(readline)
const allequal = arr => arr.every(v => v !== " " &&  v === arr[0]);
let turn = true
let gameOver = false;
let winner = ""
let combo = {
    row: undefined,
    col: undefined
}
let cells = {}

const board = [[" ", " " , " "], 
               [" ", " " , " "], 
               [" ", " " , " "], 
               
]

let m = []
let w;
//board[0][0] = "a"
let game = {
  update : function(){
    this.isgameOver();
   
    if(gameOver){
      this.updateBoard()
      console.log(`Game over ${winner} won!`)
        if(inNode){
          process.exit();
        }else{
          turn = false
        }
      }
     this.updateBoard();
    m = this.possibleMoves();
    if(m.length === 0){
      gameOver = true;
      console.log("Game over by draw")
      if(inNode){
        process.exit();
      }else{
        turn = false
      }
    }
    
  },
  isgameOver: function(){

    if(allequal(board[0])){
                      gameOver = true;
	              winner = board[0][0]
		   
		    }
		      if(allequal(board[1])){
                      gameOver = true;
			winner = board[1][0]
	
		      }
		        if(allequal(board[2])){
                          gameOver = true;
			  winner = board[2][0]
	
			}

             if(allequal([board[0][0], board[1][0], board[2][0]])){
                        gameOver = true;
	             winner = board[0][0]
             }
              if(allequal([board[0][1], board[1][1], board[2][1]])){
                        gameOver = true;
	        winner = board[0][1]
              }
               if(allequal([board[0][2], board[1][2], board[2][2]])){
                        gameOver = true;
	         winner = board[0][2]
               }
                 if(allequal([board[0][0], board[1][1], board[2][2]])){
                        gameOver = true;
	           winner = board[0][0]
		 }
                   if(allequal([board[0][2], board[1][1], board[2][0]])){
                        gameOver = true;
	             winner = board[0][2]
		   }

  },
  move : function(c){

    // console.log(board[+c.row][+c.col])
        board[+c.row][+c.col] = "x"
        combo.row = undefined
        combo.col = undefined
        this.update();
        setTimeout(() => {
            this.computer()
        }, 3000);
    },
    possibleMoves: function(){
        const p = []
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
               if(board[i][j] === " "){
                   p.push({row: i, col: j})
               }
            }
        }

        return p
    },
    computer: function(){
          // possible moves 
          // make a move
          // allow player to play
           if(gameOver) return;
          console.log(m)
          if(m.length > 0){
              let ra = Math.round(Math.random() * (m.length - 1))
              console.log(ra, "raa")
              board[m[ra].row][m[ra].col] = "O"
          }
          turn = true
          this.update()
          if(inNode){
            console.log("ur turn")
          }
    },
  updateBoard: function(){
   // this.isgameOver()
     if(inNode){
        console.log("   ")
        board.forEach((arr, i)=> {
            // second idea 1.1
            // console.log(arr.toString())
            // second idea 1.2
            // arr.fill(" ")
           
            console.log(arr.toString().replace(/,/g, "|"))
        
            // 1.3 
           // let p = arr.toString()
            //  console.log(p.split(",").join(","))----------------
        })
    }else{
      // console.log("updating viz board")
      board.forEach((arr, i)=> {
           arr.forEach((val, j)=> {
            //  console.log(val)
             if(val === "O"){
                  
                if(!cells[`${i}-${j}`].firstChild){
                 
                  const img = document.createElement("img")
                  img.src = "./img/O.png"
                  img.height = w
                  img.width = w
                  cells[`${i}-${j}`].appendChild(img)
                }
             }
           })
      })

      
    }
  }
}





if (!inNode) {
 

     function processClick(state){
         const img = document.createElement("img")
         img.src = "./img/X.png"
         img.height = state.w
         img.width = state.w
        //  img.classList.add("img")
        //  console.log(img) 
        if(board[state.row][state.col] === " " && turn){
         cells[`${state.row}-${state.col}`].appendChild(img)
         board[state.row][state.col] = "X"
         game.update();
         setTimeout(() => {
          game.computer()
      }, 300);
        }
     }

     function createCell(w, col, row){



          function keepContext(){
              
            let state = {
              col, 
              row, 
              w
            }

            let d = document.createElement("div");
            d.style = `background: lightgray;`
            d.classList.add("reset")
            d.style.paddingBottom = `${w}px`
            d.style.paddingRight = `${w}px`
            d.onclick = () => processClick(state)
            cells[`${row}-${col}`] = d
            return d

        }

      return keepContext()
     }




    let app = document.querySelector(".app") 
  // run in the browser
   console.log("will only run in the browser")
    w = Math.floor(300/board.length - 2);
/**
 * @type {HTMLDivElement}
 */
  

  //  d.width = w
  //  d.height = w
  //  console.log(d)
  const len = board.length 

  for(let i = 0; i < len; i++){
    for(let j = 0; j < len; j++){

      app.appendChild(createCell(w, i, j))
    }


 }
   



console.log(cells)
} 




// first idea
// board.forEach((arr, i)=> {
//     console.log(arr)
// })

// second idea 

// game.updateBoard()

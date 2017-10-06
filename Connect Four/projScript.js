var player1 = prompt("Enter the Name of the player one");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Enter the Name of the player two");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
  console.log("You won the game!");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function reportColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var repColor = reportColor(5,colIndex);
  for(var row = 5; row > -1; row--){
    repColor = reportColor(row,colIndex);
    if(repColor == 'rgb(128, 128, 128)')
      return row;
  }

}

function colorMatchCheck(one, two, three, four){
  return (one == two && one == three && one == four && one !== undefined && one!== 'rgb(128, 128, 128)');
}

function horizontalWinCheck(){
  for(var row=0; row<6; row++){
    for(var col=0; col<4; col++){
      if(colorMatchCheck(reportColor(row,col),reportColor(row, col+1),reportColor(row,col+2),reportColor(row ,col+3)))
      {
        console.log('Horizontal Win');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col=0; col<7; col++){
    for(var row=0; row<3; row++){
      if(colorMatchCheck(reportColor(row,col),reportColor(row+1, col),reportColor(row+2,col),reportColor(row+3 ,col)))
      {
        console.log('Vertical Win');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}
function diagonalWinCheck(){
  for(var col = 0; col<5; col++){
    for(var row = 0;row<7; row++){
      if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col+1),reportColor(row+2,col+2),reportColor(row+3,col+3))){
        console.log('Diagonal Win');
        reportWin(row,col);
        return true;
      }else
        if(colorMatchCheck(reportColor(row,col),reportColor(row-1,col+1),reportColor(row-2,col+2),reportColor(row-3,col+3))){
          console.log('Diagonal Win');
          reportWin(row,col);
          return true;
      }else {
        continue
      }
    }
  }
}

 var currentPlayer = 1;
 var currentName = player1;
 var currentColor = player1Color;

 $('h3').text(player1 + ' it is your turn to chip in');

 $('.board button').on('click', function(){

   var col = $(this).closest('td').index();

   var bottomAvail = checkBottom(col);
   changeColor(bottomAvail,col,currentColor);

   if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
     $('h1').text(currentName + " you won");
     $('h3').fadeOut('fast');
     $('h2').fadeOut('fast');
   }
   currentPlayer = currentPlayer * -1;
   if(currentPlayer === 1){
     currentName = player1;

     $('h3').text("This is your turn " + currentName)
      currentColor = player1Color;
   }else {
     currentName = player2;
     $('h3').text("This is your turn " + currentName)
     currentColor = player2Color
   }
 })

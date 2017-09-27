'use strict';

var app = angular.module('game', []);
/*
1. Create a simple 4x4 grid that is randomly populated with two tiles
2. Move the tiles when user presses arrow keys
3. Generate new tiles for every turn
4. Merge two colliding tiles into one
5. Apply the same color to tiles of same value
6. Display a message when the game is ‘won’ or when no more moves can be made
7. Add transitions when tiles are moved and merged
*/
/*known limitations:
- No dynamic css, slots doesn't change color
- No animation for when two slots merge
- No support for rule:
*/
app.controller('playController', function($scope, $window){
    var board = initBoard();

    $scope.board = board;
    /*[
      [2,'',4,2],
      ['','','',''],
      ['','','',''],
      ['','',4,'']
    ];*/
    $scope.newBoard = function(){
      var newBoard = initBoard();
      $scope.board = initBoard();
    }
    $scope.score = 0;

    $scope.keyPress = function($event){
        console.log($event.keyCode);
        //up=38,right=39,left=37,down=40
        var key = $event.keyCode;
        if(key == 38){//up
          $scope.board = moveUp($scope.board);
          randomize_slot($scope.board);
        }else if(key == 39){//right
          $scope.board = moveRight($scope.board);
          randomize_slot($scope.board);
        }else if(key == 37){//left
          $scope.board = moveLeft($scope.board);
          randomize_slot($scope.board);
        }else if(key == 40){//down
          $scope.board = moveDown($scope.board);
          randomize_slot($scope.board);
        }
      }

      function initBoard(){
        var board = [
          ['','','',''],
          ['','','',''],
          ['','','',''],
          ['','','','']
        ];
        randomize_slot(board);
        randomize_slot(board);

        return board;
      }

      function moveUp(board){
        var size = board[1].length;
        for(var col = 0; col<size; col++){
          var empty_rows= [];
          for(var row = 0; row<size; row++){
            if(board[row][col] == ''){
              empty_rows.push(row);
            }else{//if this is not an empty slot
              if(row != 0) {//if this is not the first row
                //pop the first availabe slot in the empty_slots array
                if(empty_rows.length != 0){
                  var r = empty_rows[0];
                  board[r][col] = board[row][col];
                  board[row][col] = '';
                  empty_rows.shift();
                  empty_rows.push(row);
                  if(r != 0){
                    //check if the upper slot to [r, c] is of the same value
                    if(board[r-1][col] == board[r][col]){
                      var sum = parseInt(board[r-1][col] + board[r][col]);
                      board[r-1][col] = sum;
                      board[r][col] = '';
                      $scope.score += sum;
                      if(sum == 2048){
                        $window.alert("You've won!");
                      }
                      empty_rows.push(r);
                      }
                  }

                }else{//if there're not available slots, just check above slot value
                  if(board[row-1][col] == board[row][col]){
                    var sum = parseInt(board[row-1][col] + board[row][col]);
                    board[row-1][col] = sum;
                    board[row][col] = '';
                    $scope.score += sum;
                    if(sum == 2048){
                      $window.alert("You've won!");
                    }
                    empty_rows.push(row);

                  }
                }
              }
          }
        }
      }

        return board;
      }

      function moveDown(board){
        var size = board[1].length;
        for(var col = 0; col<size; col++){
          var empty_rows = [];
          for(var row = size-1; row>=0; row--){
            if(board[row][col] == ''){
              empty_rows.push(row);
            }else{
              if(row != size-1){//check if not the last row
                if(empty_rows.length != 0){

                  var r = empty_rows[0];
                  board[r][col] = board[row][col];
                  board[row][col] = '';
                  empty_rows.shift();
                  empty_rows.push(row);
                  if(r != 3){//check that r is not the last row
                    if(board[r+1][col] == board[r][col]) {
                      var sum = parseInt(board[r+1][col]+board[r][col]);
                      board[r+1][col] = sum;
                      board[r][col] = '';
                      $scope.score += sum;
                      if(sum == 2048){
                        $window.alert("You've won!");
                      }
                      empty_rows.push(r);
                    }
                  }

                }else{//if there're no empty slots
                  if(board[row+1][col] == board[row][col]){
                    var sum = parseInt(board[row+1][col]+board[row][col]);
                    board[row+1][col] = sum;
                    board[row][col] = '';
                    $scope.score += sum;
                    if(sum == 2048){
                      $window.alert("You've won!");
                    }
                    empty_rows.push(row);
                  }
                }

              }
            }
          }
        }
        return board;
      }

      function moveLeft(board){
        var size = board[1].length;
        for(var row = 0; row<size; row++){
          var empty_cols = [];
          for(var col = 0; col<size; col++){
            if(board[row][col] == ''){
              empty_cols.push(col);
            }else{
              if(col != 0){
                if(empty_cols.length != 0){
                  var c = empty_cols[0];
                  board[row][c] = board[row][col];
                  board[row][col] = '';
                  empty_cols.shift();
                  empty_cols.push(col);
                  if(c != 0){
                    if(board[row][c-1] == board[row][col]){
                      var sum = parseInt(board[row][c-1] + board[row][c]);
                      board[row][c-1] = sum;
                      board[row][c] ='';
                      $scope.score += sum;
                      if(sum == 2048){
                        $window.alert("You've won!");
                      }
                      empty_cols.push(c);
                    }
                  }
                }else{
                  if(board[row][col-1] == board[row][col]){//check previous column
                    var sum = parseInt(board[row][col-1] + board[row][col]);
                    board[row][col-1] = sum;
                    board[row][col] = '';
                    $scope.score += sum;
                    if(sum == 2048){
                      $window.alert("You've won!");
                    }
                    empty_cols.push(col);
                  }

                }
              }

            }
          }
        }
        return board;
      }

      function moveRight(board){
        var size = board[1].length;
        for(var row = 0; row<size; row++){
          var empty_cols = [];
          for(var col = size-1; col>=0; col--){
            if(board[row][col] == ''){
              empty_cols.push(col);
            }else{
              if(col != size-1){
                if(empty_cols.length != 0){
                  var c = empty_cols[0];
                  board[row][c] = board[row][col];
                  board[row][col] = '';
                  empty_cols.shift();
                  empty_cols.push(col);
                  if(c != 0){
                    if(board[row][c] == board[row][c+1]){
                      var sum = parseInt(board[row][c] + board[row][c+1]);
                      board[row][c+1] = sum;
                      board[row][c] = '';
                      $scope.score += sum;
                      if(sum == 2048){
                        $window.alert("You've won!");
                      }
                      empty_cols.push(c);
                    }
                  }

                }else{
                  if(board[row][col+1] == board[row][col]){
                    var sum = parseInt(board[row][col+1]+board[row][col]);
                    board[row][col+1] = sum;
                    board[row][col] = '';
                    $scope.score += sum;
                    if(sum == 2048){
                      $window.alert("You've won!");
                    }
                    empty_cols.push(col);
                  }
                }
              }
            }
          }
        }
        return board;
      }

      function randomize_slot(board){
        //generate random 2 or 4 slot
        if(isBoardFull(board) == false){
          var range = 6;
          var num = Math.floor( Math.random() * range / 2 ) * 2;//0 is included in here
          while(num == 0){
            num = Math.floor( Math.random() * range / 2 ) * 2;//0 is included in here
          }
          //generate random slot (0-3)
          var r = Math.floor(Math.random() * 4) + 0;
          var c = Math.floor(Math.random() * 4) + 0;


          while(true){
            if(board[r][c] == ''){
              board[r][c] = num;
              break;
            }else{//if the [r,c] slot is not empty and num is zero, keep generate random slot
              r = Math.floor(Math.random() * 4) + 0;
              c = Math.floor(Math.random() * 4) + 0;
              //console.log('--'+r+'--'+c);
              }
          }
        }else{
          $window.alert("You've lost!");
        }
      }


      function isBoardFull(board){
        var size = board[0].length;
        for(var i = 0; i<size; i++){
          for(var j = 0; j<size; j++){
            if(board[i][j] == ''){
              return false;
            }
          }
        }
        return true;
      }

})

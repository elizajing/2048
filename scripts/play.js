/*
1. Create a simple 4x4 grid that is randomly populated with two tiles
2. Move the tiles when user presses arrow keys
3. Generate new tiles for every turn
4. Merge two colliding tiles into one
5. Apply the same color to tiles of same value
6. Display a message when the game is ‘won’ or when no more moves can be made
7. Add transitions when tiles are moved and merged
*/
'use strict';

var app = angular.module('game', [

]);

app.controller('playController', ($scope) => {
    $scope.moved = false;
    $scope.board = [
      ['','','',''],
      ['','','',''],
      ['',2,'',''],
      ['','',4,'']
      ];
    // $scope.keyUp = false;
    // $scope.keyDown = false;
    // $scope.keyLeft = false;
    // $scope.keyRight = false;


    $scope.keyPress = function($event){
        console.log($event.keyCode);
        //up=38,right=39,left=37,down=40
        var key = $event.keyCode;
        if(key == 38){//up
          $scope.board = moveUp($scope.board);
        }else if(key == 39){//right
          $scope.board = moveRight($scope.board);
        }else if(key == 37){//left
          $scope.board = moveLeft($scope.board);
        }else if(key == 40){//down
          $scope.board = moveDown($scope.board);
        }
      }


      function moveUp(board){
        var size = board[1].length;
        for(var i = 1; i<size; i++){
          for(var j = 0; j<size; j++){
            if(board[0][j] == ''){
              board[0][j] = board[i][j];
            }else{//if first row is not empty
              var sum = parseInt(board[0][j] + board[i][j]);
              board[0][j] = sum;
            }
            board[i][j] = '';
          }
        }
        return board;
      }

      function moveDown(board){
        var size = board[1].length;
        for(var i = 0; i<size; i++){
          for(var j = 0; j<size; j++){
            if(i < size-1){//check if not the last row
              if(board[size-1][j] == ''){
                board[size-1][j] = board[i][j];
              }else{//if the last row is not empty
                var sum = parseInt(board[size-1][j] + board[i][j]);
                board[size-1][j] = sum;
              }
              board[i][j] = '';
            }
          }
        }
        return board;
      }

      function moveLeft(board){
        var size = board[1].length;
        for(var i = 0; i<size; i++){
          for(var j = 1; j<size; j++){
            if(board[i][0] == ''){
              board[i][0] = board[i][j];
            }else{//if first column is not empty
              var sum = parseInt(board[i][0] + board[i][j]);
              board[i][0] = sum;
            }
            board[i][j] = '';
          }
        }
        return board;
      }

      function moveRight(board){
        var size = board[1].length;
        for(var i = 0; i<size; i++){
          for(var j = 0; j<size; j++){
            if(j < size-1){//check if not the last column
              if(board[i][size-1] == ''){
                board[i][size-1] = board[i][j];
              }else{
                var sum = parseInt(board[i][size-1] + board[i][j]);
                board[i][size-1] = sum;
              }
              board[i][j] = '';
            }
          }
        }
        return board;
      }

})

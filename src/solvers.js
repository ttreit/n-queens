/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //create board instance
  var board = new Board({'n': n});
  //create matrix variable
  var matrix = board.rows();
  //create for loop, looping through rows i
  for (var i = 0; i < n; i++) {
    //create for loop, looping through columns
    for (var j = 0; j < n; j++) {
      //toggle to i, j
      board.togglePiece(i, j);
      //check if conflicts
      if (board.hasAnyRooksConflicts()) {
        //if true toggle i, j
        board.togglePiece(i, j);
      }
    }
  }
  //solution = matrix
  var solution = matrix;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  if (n === 0) {
    return 1;
  }
  var solutionCount = n * countNRooksSolutions(n-1);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});

  //var startMatrix = call random starting location function
  var startingPoint = function(n) {
    //create board instance
    //create matrix variable
    // var matrix = board.rows();
    //startI = 0
    var startI = 0;
    //startJ = random 1 to n-2
    var startJ = Math.floor((Math.random() * (n - 2)) + 1 );
    //toggle startI, startJ
    board.togglePiece(startI, startJ);
    //return matrix
    return board;
  };

  var startBoard = startingPoint(n);
  //create for loop, looping through rows i
  for (var i = 0; i < n; i++) {
    //create for loop, looping through columns
    for (var j = 0; j < n; j++) {
      //if startI = i AND startJ = j skip the loops
      if (startBoard[i][j] === 1) {
        continue;
      }
      //toggle to i, j
      startBoard.togglePiece(i, j);
      //check if conflicts
      if (startBoard.hasAnyQueensConflicts()) {
        //if true toggle i, j
        startBoard.togglePiece(i, j);
      }
    }
  }
  //solution = matrix
  var solution = startBoard;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

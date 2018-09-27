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
  var board = new Board({n: n});
  var boardChecker = function(board, rowsLeft = n) {
    if (rowsLeft === 0) {
      return board;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(n - rowsLeft, i);
      if (!board.hasAnyRooksConflicts()) {
        var shouldReturn = boardChecker(board, rowsLeft - 1);
        if (shouldReturn) {
          return shouldReturn;
        }
      }
      board.togglePiece(n - rowsLeft, i);
    }
  };
  
  
  var solution = boardChecker(board).rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
}; // O(n!) time complexity, could be refactored to linear

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = _.range(1, n + 1).reduce((a, b) => a * b);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
}; // O(n) time complexity;

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  var boardChecker = function(board, rowsLeft = n) {
    if (rowsLeft === 0) {
      return board;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(n - rowsLeft, i);
      if (!board.hasColOrDiagonalConflictsAt(n - rowsLeft, i)) {
        var shouldReturn = boardChecker(board, rowsLeft - 1);
        if (shouldReturn) {
          return shouldReturn;
        }
      }
      board.togglePiece(n - rowsLeft, i);
    }
    
  };
  
  
  board = boardChecker(board) || board;
  solution = board.rows();
  
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var boardChecker = function(board, rowsLeft = n) {
    if (rowsLeft === 0) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(n - rowsLeft, i);
        if (!board.hasColOrDiagonalConflictsAt(n - rowsLeft, i)) {
          boardChecker(board, rowsLeft - 1);
        }
        board.togglePiece(n - rowsLeft, i);
      }
    }
  };
   
  boardChecker(board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

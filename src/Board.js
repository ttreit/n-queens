// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) { // [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]
      var counter = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    //Time Complexity O(n)

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var matrix = this.rows(); // [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    //Time Complexity O(n^2)



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var matrix = this.rows();
      var counter = 0;
      for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    //Time Complexity O(n)

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var matrix = this.rows();
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Time Complexity O(n^2)


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //start at row 0 always
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create counter
      var counter = 0;
      //get matrix
      var matrix = this.rows();
      //create row index variable and set to 0
      var rowIndex = 0;
      //create column index set to parameter
      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      //if column index is < 0
      if (columnIndex < 0) {
        //set row index to abs of column index
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        //set column index to 0
        columnIndex = 0;
      }
      //while row index < matrix.length and column index < matrix.length
      while (rowIndex < matrix.length && columnIndex < matrix.length) {
        //if matrix at (row, column) === 1
        if (matrix[rowIndex][columnIndex] === 1) { // matrix[0][0]  //TODO TAMMY look at this more
          //counter ++
          counter++;
        }
        //row index ++
        rowIndex++;
        //column ++
        columnIndex++;
      }
      return counter > 1;
    },

    //Time Complexity: O(n)


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // get matrix, store it in a variable
      var matrix = this.rows();
      // check columns for conflict
      for (let i = -(matrix.length); i < matrix.length; i++) {
        // if conflict true
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // // check rows for conflict
      // for (let i = 0; i < matrix.length - 2; i++) {
      //   // if conflict true
      //   if (this.hasMajorDiagonalConflictAt(-i)) {
      //     return true;
      //   }
      // }
      return false;
    },
    //Time Complexity O(n^2)


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create counter variable
      var counter = 0;
      // get matrix variable
      var matrix = this.rows();
      // create rowIndex 0
      var rowIndex = 0;
      // create colIndex minorDiagonalColumnIndexAtFirstRow
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      // create loop through matrix
      for (var i = 0; i < matrix.length; i++) {
        // check if there's a piece at loc (equals 1)
        // if matrix[rowIndex][columnIndex] === 1
        if (matrix[rowIndex][columnIndex] === 1) {
          // if yes increase counter
          counter++;
          // if counter > 1 return true
          if (counter > 1) {
            return true;
          }
        }
        // rowIndex++, columnIndex--
        rowIndex++;
        columnIndex--;
      }
      return false;
    },

    //Time Complexity: O(n)

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //get matrix variable
      var matrix = this.rows();
      // for loop that goes through all the rows
      for (var i = 0; i < (2 * matrix.length); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      //return false
      return false;
    }
    //Time Complexity: O(n^2)


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

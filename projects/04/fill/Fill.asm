// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// while true:
//   get the key
//
//   if the key is not 0:
//     set paint to black (-1)
//   else (if the key is 0):
//     set paint to white (0)
//
//   loop through every pixel
//     set it to paint value

// @SCREEN // get screen base address (16384)
        // 256 rows of 512 pixels per row

// @KBD // get keyboard address (24576)

@32
D=A
@numbersPerRow
M=D

@256
D=A
@allRows
M=D

@paint
M=0 // By default, paint white

(LOOP)
  @currentRow
  M=0

  @currentColumn
  M=0

  @SCREEN
  D=A
  @currentAddress
  M=D

  @KBD
  D=M // Read keyboard input

  @NOKEYPRESSED
  D;JEQ // Jump if keyboard value == 0

  (KEYISPRESSED)
  // Set to black
  @paint
  M=-1

  @ENDKEYBOARDHANDLING
  0;JMP

  (NOKEYPRESSED)
  // Set to white
  @paint
  M=0

  (ENDKEYBOARDHANDLING)

  (ROWSLOOP)
    @currentRow
    D=M
    @allRows
    D=D-M
    @ENDROWSLOOP
    D;JGE // Stop painting if we've covered all rows

    @currentColumn
    M=0

    (COLUMNSLOOP)
      @currentColumn
      D=M
      @numbersPerRow
      D=D-M
      @ENDCOLUMNSLOOP
      D;JGE

      @paint
      D=M // Get paint value
      @currentAddress
      A=M
      M=D // Paint to pixels with paint value

      @currentColumn
      M=M+1

      @currentAddress
      M=M+1

      @COLUMNSLOOP
      0;JMP
    (ENDCOLUMNSLOOP)

    // increment current row
    @currentRow
    M=M+1

    @ROWSLOOP
    0;JMP
  (ENDROWSLOOP)

  @LOOP
  0;JMP // Infinitely loop
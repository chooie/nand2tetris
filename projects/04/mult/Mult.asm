// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// PSEUDOCODE
//
// int firstNumber = (load R0);
// int secondNumber = (load R1);
// int sum = 0;

// for (int i = 0; i < firstNumber; i += 1) {
//   sum = sum + secondNumber;
// }
// 
// (load into R2 sum)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Load R0
@0
D=M
// firstNumber = (load R0)
@firstNumber
M=D

// Load R1
@1
D=M

// Reset R2 to 0
@2
M=0

// secondNumber = (load R1)
@secondNumber
M=D

// sum = 0
@sum
M=0

// i = 0
@i
M=0

(LOOP)
  @i
  D=M
  
  @firstNumber
  D=D-M

  @FINISHMULT
  D;JGE // if (i >= firstNumber) goto FINISHMULT

  // otherwise

  @secondNumber
  D=M
  @sum
  M=D+M // sum = secondNumber + sum

  @i
  M=M+1 // i = i +1

  @LOOP
  0;JMP // goto LOOP

(FINISHMULT)
@sum
D=M

@2
M=D // RAM[2] = sum

(END)
  @END
  0;JMP
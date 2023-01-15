// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/StackArithmetic/StackTest/StackTest.vm

// Executes a sequence of arithmetic and logical operations
// on the stack. 
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_EQUAL_0
D;JEQ
@SP
A=M-1
M=0
@END_CASE_HANDLING_1
0;JMP
(CASE_EQUAL_0)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_1)
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_EQUAL_2
D;JEQ
@SP
A=M-1
M=0
@END_CASE_HANDLING_3
0;JMP
(CASE_EQUAL_2)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_3)
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_EQUAL_4
D;JEQ
@SP
A=M-1
M=0
@END_CASE_HANDLING_5
0;JMP
(CASE_EQUAL_4)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_5)
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_LESS_THAN_6
D;JLT
@SP
A=M-1
M=0
@END_CASE_HANDLING_7
0;JMP
(CASE_LESS_THAN_6)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_7)
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_LESS_THAN_8
D;JLT
@SP
A=M-1
M=0
@END_CASE_HANDLING_9
0;JMP
(CASE_LESS_THAN_8)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_9)
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_LESS_THAN_10
D;JLT
@SP
A=M-1
M=0
@END_CASE_HANDLING_11
0;JMP
(CASE_LESS_THAN_10)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_11)
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_GREATER_THAN_12
D;JGT
@SP
A=M-1
M=0
@END_CASE_HANDLING_13
0;JMP
(CASE_GREATER_THAN_12)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_13)
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_GREATER_THAN_14
D;JGT
@SP
A=M-1
M=0
@END_CASE_HANDLING_15
0;JMP
(CASE_GREATER_THAN_14)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_15)
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@CASE_GREATER_THAN_16
D;JGT
@SP
A=M-1
M=0
@END_CASE_HANDLING_17
0;JMP
(CASE_GREATER_THAN_16)
@SP
A=M-1
M=-1
(END_CASE_HANDLING_17)
// push constant 57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 53
@53
D=A
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
AM=M-1
D=M
A=A-1
M=D+M
// push constant 112
@112
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP
AM=M-1
D=M
A=A-1
M=M-D
// neg
@SP
A=M-1
M=-M
// and
@SP
AM=M-1
D=M
A=A-1
M=D&M
// push constant 82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1
// or
@SP
AM=M-1
D=M
A=A-1
M=D|M
// not
@SP
A=M-1
M=!M

(END)
  @END
  0;JMP

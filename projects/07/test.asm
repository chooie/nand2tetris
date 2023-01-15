// DON'T DELETE
@256
D=A
@SP
M=D
// DON'T DELETE

// push constant 1
@1
D=A
@SP
M=M+1
A=M-1
M=D
// push constant 0
@0
D=A
@SP
M=M+1
A=M-1
M=D
// and
@SP
AM=M-1
D=M
A=A-1
M=D&M
(END)
  @END
  0;JMP

export const PREDEFINED_SYMBOL_TABLE = {
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  SCREEN: 16384,
  KBD: 24576,
  LOOP: 4,
  STOP: 18,
} as const;

export type SymbolTable = ReturnType<typeof makeSymbolTable>;

export function makeSymbolTable() {
  const symbolTable: { [key: string]: number } = {
    ...PREDEFINED_SYMBOL_TABLE,
  };

  return {
    symbolTable,
    doesContain(symbol: string): boolean {
      return Object.prototype.hasOwnProperty.call(symbolTable, symbol);
    },
    add(symbol: string, value: number) {
      if (this.doesContain(symbol)) {
        throw new Error(`Symbol already exists, '${symbol}'`);
      }

      symbolTable[symbol] = value;
    },
    getSymbolAddress(symbol: string): number {
      return symbolTable[symbol];
    },
  };
}

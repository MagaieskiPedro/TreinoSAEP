import { describe, it, expect } from "vitest";

describe("matematica basica", () =>{
    it("soma 2 + 2",()=>{
        expect(2+2).toBe(4);
    })
    it("Multiplicação 3*3", ()=>{
        expect(3 * 3).toBe(9);
    })
    it("Divisao 3/3",()=>{
        expect(3/3).toBe(1)
    })
})
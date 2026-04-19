export const TOKENS={
    YYYY:(y:number)=> String(y),
    MM:(m:number)=> String(m).padStart(2,"0"),
    DD:(d:number) => String(d).padStart(2,"0"),
}
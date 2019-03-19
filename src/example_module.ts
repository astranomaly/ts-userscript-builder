// You can clean up your code by splitting things into distinct files, and referencing them in the main app file
namespace example {
    export const msg2 = 'exported ';
    export let msngr = (inp:string) => {
        console.log(`${inp} ${msg2}`);
    };
}

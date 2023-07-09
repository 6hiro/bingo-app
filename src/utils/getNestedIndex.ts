export const getNestedIndex = (arr: string[][], target: string) => {
    for (let i = 0; i < arr.length; i++) {
        const innerArray = arr[i];
        if (innerArray.includes(target)) {
            if (innerArray.indexOf(target) !== -1) {
                return i;
            }
        }
    }
    return -1;
};
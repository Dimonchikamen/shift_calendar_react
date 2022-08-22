export const getOptions = (min: number, max: number, step = 1) => {
    const res = [];
    for (let i = min; i <= max; i += step) {
        res.push(`${i}:00`);
    }
    return res;
};

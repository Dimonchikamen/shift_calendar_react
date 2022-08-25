export const mapWhere = <T>(array: T[], predicate: (el: T) => boolean) => {
    const res: T[] = [];
    array.forEach(elem => {
        if (predicate(elem)) {
            res.push(elem);
        }
    });
    return res;
};

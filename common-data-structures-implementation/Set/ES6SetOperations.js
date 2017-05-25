//并集运算，Given two sets, this returns a new set with elements from both the given sets
function union(setA, setB) {
    return newSet = new Set([...setA, ...setB]);
}

//交集运算，Given two sets, this returns a new set with the elements that exist in both sets
function intersection(setA, setB) {
    let newSet = new Set();

    //遍历setB找到同样存在于setA中的元素push到newSet中
    for (let val of setB) {
        if (setA.has(val)) {
            newSet.add(val);
        }
    }

    return newSet;
}

//补集运算，Given two sets, this returns a new set with all the elements that exist
//in the first set and do not exist in the second set
function difference(setA, setB) {
    let differenceSet = new Set();

    for (let x of setA) {
        if (!setB.has(x)) {
            differenceSet.add(x);
        }
    }

    return differenceSet;
}
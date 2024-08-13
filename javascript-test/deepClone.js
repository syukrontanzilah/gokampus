// 1. Write a function 'deepClone' that performs a deep clone of an object. 
// Avoid using libraries like Lodash.

const deepClone = (obj, map = new WeakMap()) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (map.has(obj)) {
        return map.get(obj);
    }
    if (Array.isArray(obj)) {
        const arrCopy = [];
        map.set(obj, arrCopy);
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = deepClone(obj[i], map);
        }
        return arrCopy;
    }
    const objCopy = {};
    map.set(obj, objCopy);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepClone(obj[key], map);
        }
    }
    return objCopy;
}

const data = {
    name: 'Ahmad',
    age: 30,
    address: {
        city: 'Bandung',
        code: '404044'
    },
    hobbies: ['sepak bola', 'sepeda'],
};

const cloned = deepClone(data);
console.log(cloned);
console.log(cloned.address === data.address); 
console.log(cloned.hobbies === data.hobbies); 

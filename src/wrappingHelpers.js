const getFieldValueAtWrappedPath = (node, path) => {
    let result = node;
    for (let i = 0; i < path.length; i++) {
        result = result.wrappedObject[path[i]];
    }
    return result;
};

const isDefeinedOnPath = (node, path) => {
    if (path.length < 1) {
        throw "Invalid path array";
    }
    let currentNode = node;
    for (let i = 0; i < path.length; i++) {
        if (!currentNode.wrappedObject.hasOwnProperty(path[i])) {
            return false;
        }
    }
    return true;
};

const getPathArrayFromObjectPath = (objectPath) => {
    return objectPath.split('.');
}


module.exports = {
    getFieldValueAtWrappedPath,
    isDefeinedOnPath,
    getPathArrayFromObjectPath
};
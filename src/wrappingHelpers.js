const getFieldValueAtWrappedPath = (node, path) => {
    let result = node;
    for (let i = 0; i < path.length; i++) {
        result = result.wrappedObject[path[i]];
    }
    return result;
};

const getPathArrayFromObjectPath = (objectPath) => {
    return objectPath.split('.');
}

module.exports = {
    getFieldValueAtWrappedPath,
    getPathArrayFromObjectPath
};
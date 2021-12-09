const DEFAULT = 'Default';

// Returns parameters with default values specified in cloudformation template
function getParameterDefaults(parameters) {
    const results = {};
    for(const [paramName, paramDefinition] of Object.entries(parameters)) {
        if(paramDefinition.hasOwnProperty(DEFAULT)) {
            results[paramName] = paramDefinition[DEFAULT];
        }
    }
    return results;
}

module.exports = {
    getParameterDefaults
}
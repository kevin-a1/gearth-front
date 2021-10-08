// TODO Change m_ prefix when service available
const prefix = 'm_'
export const filter_by_intensity = (modelId, intensity, userId) => {
    return `MATCH (n:${prefix}${modelId}:\`${userId}\`) MATCH p=(n)-[r:INTERACTS]->(n2) WHERE r.intensity = "${intensity}" RETURN *;`
}

export const filter_by_key_relationships = (modelId, key, userId) => {
    return `MATCH (n:${prefix}${modelId}:\`${userId}\`) MATCH p=(n)-[r:INTERACTS]->(n2) WHERE r.key = "${key}" RETURN *;`
}

export const get_all_model_data = (modelId, userId) => {
    const query = `MATCH (n:${prefix}${modelId}:\`${userId}\`) MATCH p=(n)-->(n2) RETURN *;`
    return query

}



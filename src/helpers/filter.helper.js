const productQueryObject = ({ payload, category }) => {
    const queryObject = {};

    // { category: 'electronica', userId: '66c63a200b72372eec9e13ff' }

    if( category !== 'all' ) {
        queryObject.category = category;     // { category: 'electronica' }
    }
    if( payload ) {
        queryObject.userId = payload.id;     // { userId: '66c63a200b72372eec9e13ff' }
    }

    return queryObject;
}


module.exports = {
    productQueryObject
}
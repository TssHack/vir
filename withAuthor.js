module.exports = function withAuthor(req, res, next) {
    const originalJson = res.json;

    res.json = function (body) {
        const wrapped = {
            author: 'ehsan fazli',
            success: true,
            result: body
        };
        return originalJson.call(this, wrapped);
    };

    next();
};

// export default async (request, response, next) => {
//     return response.sendStatus(201);
// };

export default (a) => (request, response, next) => {
    if (a) {
        return response.sendStatus(403);
    }
    next();
}
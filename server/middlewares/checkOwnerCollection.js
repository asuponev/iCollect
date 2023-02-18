import Collection from '../models/Collection.js';

export default async (req, res, next) => {
  try {
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      next();
    } else {
      res.status(403).json({
        message: 'Not access'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Not access'
    });
  }
}
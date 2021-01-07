module.exports = {
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://dev:19961101@bucket-list.gpcdf.mongodb.net/buckets?retryWrites=true&w=majority",
  PORT: process.env.PORT || 2000,
};

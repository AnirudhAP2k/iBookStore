import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },

        author: {
            type: String,
            required: true
        },

        publishedAt: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);
const bookModel = mongoose.model('book', bookSchema)

export default bookModel;

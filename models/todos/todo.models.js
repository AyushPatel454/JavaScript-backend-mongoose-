import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        complete: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // This is the model name of the user model. (1st argument of mongoose.model() function in user.models.js)
        },
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo"
            }
        ] // Array of Sub-Todo
    }, 
    { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
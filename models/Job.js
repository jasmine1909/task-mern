const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "PLease provide title"],
        maxlength: 50
    },
    content: {
        type: String,
        required: [true, "please provide content"],
        maxlength: 1000
    },
    status: {
        type: String,
        enum: ['completed', "not completed", "working"],
        default: "working"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    },

}, { timestamps: true })

module.exports = mongoose.model("Job", JobSchema)
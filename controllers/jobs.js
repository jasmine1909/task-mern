const Job = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")




const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt")
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(` no job with id : ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })




    // res.json(req.body)
}
const updateJob = async (req, res) => {
    const { body: { title, content }, user: { userId }, params: { id: jobId }, } = req

    if (title === "" || content === "") {
        throw new BadRequestError("title and content cannot be empty")
    }

    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`no job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })


}
const deleteJob = async (req, res) => {
    const { body: { title, content }, user: { userId }, params: { id: jobId }, } = req
    const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(`no job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}
module.exports = {
    getAllJobs,
    getJob,
    deleteJob,
    createJob,
    updateJob
}
const Track = require("../models/track");

const trackOrder = async (req, res) => {
    const {trackingNo} = req.body;
    const trackStatus = await Track.findOne({trackNumber: trackingNo});

    res.status(200).json({trackStatus});
}

const getAllTrackDetails = async (req, res) => {
    const trackDetails = await Track.find({});
    res.status(200).json({tracks: trackDetails});
}

const getSingleTrackDetail = async (req, res) => {
    const {id: trackId} = req.params;
    const trackDetail = await Track.find({_id: trackId});
    if (!trackDetail){
        throw new CustomError.NotFoundError(`No trackDetail with id: ${trackId}`);
    }
    res.status(200).json({trackDetail});
}

const updateTrackDetail = async (req, res) => {
    const {id: trackId} = req.params;
    const trackDetail = await Track.findByIdAndUpdate(trackId, req.body, {new: true, runValidators: true});
    if(!trackDetail){
        throw new CustomError.NotFoundError(`No trackDetail with id: ${trackId}`);
    }
    res.status(200).json({trackDetail})
}

const DeleteTrackDetail = async (req, res) => {
    const {id: trackId} = req.params;
    await Track.findByIdAndDelete(trackId)
    res.status(200).json({msg: "Successful"})
}

module.exports = {
    trackOrder,
    updateTrackDetail,
    getAllTrackDetails,
    getSingleTrackDetail,
    updateTrackDetail,
    DeleteTrackDetail
};
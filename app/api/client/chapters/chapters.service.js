import {CommonPageLimit} from "../../../utils/common-function";
const Chapter = require("../../../models/chapter");

const getByChapterId = async (args = {}) => {
    const { chapterId } = CommonPageLimit(args);

    if (!chapterId) throw new Error("Missing kinds");

    const chapter = await Chapter.findById(chapterId).select("_id title content slug referrer")
        .lean();

    if (!chapter) throw new Error("Chapter not found");

    return chapter;
}

export {
    getByChapterId
}
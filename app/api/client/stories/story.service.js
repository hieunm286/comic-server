import Story from "../../../models/story";
import Chapter from "../../../models/chapter";
const mongoose = require('mongoose');

import { CommonPageLimit } from "../../../utils/common-function";
import {
  getSearchOption,
  mergeSearchObjToPopulate,
  poppulate,
} from "../../library/new-search";
import { parsePaginationOption, SumOption } from "../../library/search";

const getAllStories = async (args = {}) => {
  const defaultSortField = "updatedAt";

  const unSelectField = ["chapters"];

  const searchModel = {
    name: "string",
  };

  const poppulateObj = {
    kinds: { __from: "kinds", __isArray: true, __unSelect: ["stories"] },
    author: { __from: "authors", __unSelect: ["stories"] }
  };

  const validSearchOption = getSearchOption(args, searchModel);
  mergeSearchObjToPopulate(validSearchOption, poppulateObj, searchModel, args);
  const paginationOption = parsePaginationOption(args);
  const sortOption = {
    [args.sortBy
      ? args.sortBy === ""
        ? defaultSortField
        : args.sortBy
      : defaultSortField]: args.sortType === "asc" ? 1 : -1,
  };
  const { page, limit } = paginationOption;
  const skipOptions = limit * (page - 1);

  const [pop] = poppulate(poppulateObj);
  console.log("pop", pop);
  const query = await Story.aggregate([
    ...pop,
    { $unset: unSelectField },
    { $sort: sortOption },
    { $skip: skipOptions },
    { $limit: limit },
  ]).collation({
    locale: "vi",
    numericOrdering: true,
  });
  const total = await Story.aggregate([...pop, SumOption]);

  return {
    data: query,
    paging: { page, limit, total: total.length === 0 ? 0 : total[0].n },
  };
};

const getStoryById = async (args = {}) => {
    const validateArgs = (args) => {
      let { storyId, chapter } = args;
      if (!storyId) throw new Error("Missing storyId");
      if (!chapter) {
          chapter = 1
      };
      if (parseInt(chapter) < 1) throw new Error("Wrong chapter format");
      return { vStoryId: storyId, vChapter: chapter };
    };
  
    const { vStoryId, vChapter } = validateArgs(args);

  const story = await Story.findById(vStoryId)
    .populate([{ path: "kinds", select: "name" }])
    .lean();
  if (!story) throw new Error("Story not found");

  const chapters = await Chapter.find({ story: mongoose.Types.ObjectId(story._id) }, { content: false, story: false }).sort('slug').collation({
    locale: "vi",
    numericOrdering: true,
  });

  return { ...story, chapters: chapters };
};

export { getAllStories, getStoryById };

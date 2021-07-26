import { CommonPageLimit } from "../../../utils/common-function";
import {
  getSearchOption,
  mergeSearchObjToPopulate,
  poppulate,
} from "../../library/new-search";
import { parsePaginationOption, SumOption } from "../../library/search";

const Kind = require("../../../models/kind");

const getAllKinds = async (args = {}) => {
  const defaultSortField = "updatedAt";

  const unSelectField = ["stories"];

  const searchModel = {
    name: "string",
  };

  const poppulateObj = {};

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
  const query = await Kind.aggregate([
    ...pop,
    { $unset: unSelectField },
    { $sort: sortOption },
    { $skip: skipOptions },
    { $limit: limit },
  ]).collation({
    locale: "vi",
    numericOrdering: true,
  });
  const total = await Kind.aggregate([...pop, SumOption]);

  return {
    data: query,
    paging: { page, limit, total: total.length === 0 ? 0 : total[0].n },
  };
};

const getKindById = async (args = {}) => {
  const { kindId, page, limit } = CommonPageLimit(args);

  if (!kindId) throw new Error("Missing kinds");

  const kind = await Kind.findById(kindId)
    .populate([
      {
        path: "stories",
        select: "name thumbnail describe type",
        model: "Story",
        options: {
            skip: (page - 1) * limit,
            limit: limit
        },
      },
    ])
    .lean();

  if (!kind) throw new Error("Kind not found");

  return kind;
};

export { getAllKinds, getKindById };

import { CommonPageLimit } from "../../../utils/common-function";
import {
    getSearchOption,
    mergeSearchObjToPopulate,
    poppulate,
} from "../../library/new-search";
import { parsePaginationOption, SumOption } from "../../library/search";

const Author = require("../../../models/author");

const getAllAuthors = async (args = {}) => {
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
    const query = await Author.aggregate([
        ...pop,
        { $unset: unSelectField },
        { $sort: sortOption },
        { $skip: skipOptions },
        { $limit: limit },
    ]).collation({
        locale: "vi",
        numericOrdering: true,
    });
    const total = await Author.aggregate([...pop, SumOption]);

    return {
        data: query,
        paging: { page, limit, total: total.length === 0 ? 0 : total[0].n },
    };
};

const getAuthorById = async (args = {}) => {
    const { authorId, page, limit } = CommonPageLimit(args);

    if (!authorId) throw new Error("Missing authorId");

    const author = await Author.findById(authorId)
        .populate([
            {
                path: "stories",
                select: "name thumbnail describe type slug",
                model: "Story",
                // options: {
                //     sort: { view: -1 },
                //     skip: (page - 1) * limit,
                //     limit: limit,
                //     lean: true
                // },
            },
        ])
        .lean();

    if (!author) throw new Error("Author not found");

    return author;
};

export { getAllAuthors, getAuthorById };

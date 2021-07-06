const Kind = require("../../../models/kind")

const getAllKinds = async () => {
    const kinds = await Kind.find({})
    console.log('zzz')
    console.log(kinds)

    return {
        data: kinds
    }
}

export {
    getAllKinds
}
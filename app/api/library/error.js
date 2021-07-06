const { badRequest, serverError, notFound } = require('../../utils/response-utils');
const CommonError = (req, err, res) => {
  const regex = new RegExp(/^[A-Z._]+$/);
  if (regex.test(err.message)) {
    return res.json(serverError(err.message));
  }
  if (/must not be/.test(err.message) || /must be/.test(err.message)) return res.json(badRequest(err.message));
  if (/not found/.test(err.message)) return res.json(notFound(err.message));

  return res.json(serverError(err.message));
};

module.exports = {
  CommonError
}

export const CommonPageLimit = (page, limit) => {
  if (!page) page = 1;
  if (!limit) limit = 5;

  if (page < 1) page = 1;
  if (limit < 1) limit = 1;
  if (limit > 100) limit = 100;

  page = parseInt(page);
  limit = parseInt(limit);

  return { page, limit }
};

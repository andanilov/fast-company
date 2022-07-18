export const getPaginatedData = (list, currentPage, pageSize) =>
  [...list].splice((currentPage - 1) * pageSize, pageSize);

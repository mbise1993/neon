export enum Filter {
  ALL,
  ACTIVE,
  COMPLETED,
}

export const getFilterFromPath = (path: string): Filter => {
  switch (path) {
    case '/active':
      return Filter.ACTIVE;
    case '/completed':
      return Filter.COMPLETED;
    default:
      return Filter.ALL;
  }
};

export type Filter = 'all' | 'active' | 'completed';

export const getFilterFromPath = (path: string): Filter => {
  switch (path) {
    case '/active':
      return 'active';
    case '/completed':
      return 'completed';
    default:
      return 'all';
  }
};

export const convertObject = (from: any, to: any) => {
  for (const key of Reflect.ownKeys(from)) {
    if (to.hasOwnProperty(key)) {
      from[key] = to[key];
    }
  }
  return from;
};

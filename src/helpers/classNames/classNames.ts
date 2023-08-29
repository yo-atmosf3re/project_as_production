
type ModsType = Record<string, boolean | string>;

export const classNames = (cls: string, mods: ModsType, additional: string[]): string => {
   console.log(Object.entries(mods), 'Object.entries(mods)');
   console.log(Object.entries(mods).filter(([className, value]) => {
      console.log(Boolean(className), 'Boolean(className)');
      return Boolean(value)
   }), 'Object.entries(mods).filter');
   console.log(Object.entries(mods).filter(([className, value]) => Boolean(value)).map(([className]) => className), 'Object.entries(mods).filter.map');
   return [
      cls,
      ...additional,
      ...Object.entries(mods)
         .filter(([className, value]) => Boolean(value))
         .map(([className]) => className)
   ]
      .join(' ');
}
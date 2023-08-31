type ModsType = Record<string, boolean | string>;

export const classNames = (cls: string, mods: ModsType = {}, additional: string[] = []): string => [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => Boolean(value))
        .map(([className]) => className),
]
    .join(' ');

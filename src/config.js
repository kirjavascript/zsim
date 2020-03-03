export function defaults(obj) {
    return Object.assign({

    }, obj);
}

export function Config(cube, config) {
    Object.keys(config)
        .forEach(key => {
            Object.defineProperty(cube, key, {
                get: () => config[key],
                set: (value) => { config[key] = value; cube.onChange(key, config); },
            });
        });
}

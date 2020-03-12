import { quarter } from './moves';

export function defaults(obj) {
    const config = Object.assign({
        zoom: 1,
        size: 400,
        tps: 4,
        backface: false,
        colors: [
            '#ffffff',
            '#0045ad',
            '#b90000',
            '#009b48',
            '#ff5900',
            '#ffd500',
        ],
        cubeColor: '#000000',
        rotate: { x: -quarter / 2, y: quarter / 2 },
    }, obj);

    // computed values

    Object.defineProperty(config, 'baseZoom', {
        get: () => config.size / 400,
    });

    return config;
}

// expose config

export function reactive(config, API) {
    Object.keys(config)
        .forEach(key => {
            Object.defineProperty(API, key, {
                get: () => config[key],
                set: (value) => {
                    config[key] = value;
                    API.onChange(key);
                },
            });
        });

    Object.defineProperty(API, 'onChange', { enumerable: false });

    return API;
}

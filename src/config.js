import { quarter } from './moves';

export function defaults(obj) {
    return Object.assign({
        zoom: 2,
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

    return API;
}

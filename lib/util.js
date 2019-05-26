/* @flow */

export function isBrowser() : boolean {
    // $FlowFixMe
    return Boolean(typeof window !== undefined && process.browser);
}

export function noop() {
    // pass
}

export function hasConstant(constant : { [string] : string }, value : string) : boolean {
    return Object.values(constant).indexOf(value) !== -1;
}

export function objToQuery(obj : { [string] : string }) : string {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(`${ encodeURIComponent(p)  }=${  encodeURIComponent(obj[p]) }`);
        }
    }
    return str.join('&');
}

export function getLocalStorage<T>(key : string) : ?T {
    try {
        return window.localStorage.getItem(key);
    } catch (err) {
        // pass
    }
}

export function setLocalStorage<T>(key : string, value : T) : T {
    try {
        window.localStorage.setItem(key, value);
    } catch (err) {
        // pass
    }

    return value;
}

export function delay(time : number) : Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}

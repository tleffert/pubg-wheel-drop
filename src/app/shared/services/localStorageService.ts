/**
 * Convenience class for interacting with local storage
 */
export class LocalStorageService {

    private static EXPIRE_HOURS = 2;

    /**
     * Saves the provided state, stringified, as the value for the key - localStorageKey to localstorage
     * @param  state           Some json object, preferably from NGRX store
     * @param  localStorageKey Key to save the state under
     */
    static setSavedState(state: any, localStorageKey: string) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
        this.setExpireTime(localStorageKey);
    }

    /**
     * Retrieves the saved value for provided key. Assumes the saved data is stringified json.
     * @param  localStorageKey Key to fetch saved data
     * @return                 Parsed json of the retreieved value.
     */
    static getSavedState(localStorageKey: string): any {
        // only return from local storage if it passed expiration
        if(!this.isExpired(localStorageKey)) {
            return JSON.parse(localStorage.getItem(localStorageKey));
        } else {
            localStorage.removeItem(localStorageKey);
            this.removeExpire(localStorageKey);
        }
    }

    /**
     * Sets and expire time for provided key
     * @param  key Key to apply expire time in local storage
     */
    private static setExpireTime(key) {
        let expire = new Date();
        expire.setHours(expire.getHours() + this.EXPIRE_HOURS);
        localStorage.setItem(key+'-EXPIRE', expire.toISOString());
    }

    /**
     * Checks local storage if cache should be expired for provided key
     * @param  key Key to check if should be expired in local storage
     * @return     boolean, is past expiration or not
     */
    private static isExpired(key): boolean {
        let expire = new Date(localStorage.getItem(key+'-EXPIRE'));
        let current = new Date();

        return current > expire;
    }

    private static removeExpire(key) {
        localStorage.removeItem(key+'-EXPIRE');
    }
}

const keys = {
    workingSet: 'working-set',
    layouts: 'boards'
}

function getStore(){
    const serialized = window.localStorage.getItem(keys.layouts);
    if(serialized != null){
        const layouts = JSON.parse(serialized);
        if(Array.isArray(layouts)){
            return layouts;
        }
    }
    return [];
}

function save(store){
    if(Array.isArray(store)){
        window.localStorage.setItem(keys.layouts, JSON.stringify(store));
    }
}

function setDefault(layoutName){
    if(typeof layoutName === 'string' && layoutName.trim().length > 0){
        window.localStorage.setItem(keys.workingSet, layoutName);
    } else {
        throw new Error('Cannot set default layout; specified layoutName must be a non-empty string');
    }
}

export function saveLayout(layoutName, layout){
    if(typeof layoutName === 'string'){
        if(Array.isArray(layout)){
            const entry = {
                name: layoutName,
                players: layout
            };
            const store = getStore();
            const idx = store.findIndex(l => l.name === layoutName);
            if(idx >= 0){
                store[idx] = entry;
            } else {
                store.push(entry);
            }
            save(store);
            setDefault(layoutName);
        } else {
            throw new Error('Cannot save layout: the specified layout must be an array');
        }
    } else {
        throw new Error('Cannot save layout: the specified layoutName must be a string');
    }
}

export function getLayout(layoutName){
    const store = getStore();
    const layout = store.find(l => l.name === layoutName)
    if(layout && Array.isArray(layout.players)){
        setDefault(layoutName);
        return layout.players;
    }
    return null;
}

/**
 * Retrieve the stored layout names
 * @returns {string[]} the list of layout names
 */
export function getLayoutNames(){
    return getStore().map(l => l.name);
}

/**
 * Check the existence of a layout
 * @param {string} layoutName The name of the layout to check
 * @returns {boolean} true if the layout exists
 */
export function hasLayout(layoutName){
    return getLayout(layoutName) != null;
}

/**
 * Check for the existence of a default layout
 * @returns {string} a non-null string if a default layout is present
 */
export function getDefaultLayout(){
    const layoutName = window.localStorage.getItem(keys.workingSet);
    if(hasLayout(layoutName)){
        return layoutName;
    } else {
        return null;
    }
}


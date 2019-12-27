function ObjectStorage() {
    let data;

    function set(value) {
        data = value;
    }

    function get() {
        return data;
    }

    return {
        set,
        get
    };
}

export default ObjectStorage;

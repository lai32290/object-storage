function ObjectStorage() {
    let data;
    let logs = [];

    function set(value) {
        data = value;
    }

    function get() {
        return data;
    }

    function log(message) {
        if (message === null || message === undefined) {
            return logs[0];
        }

        logs.push(message);
    }

    function logs() {
        return logs;
    }

    return {
        set,
        get,
        log,
        logs
    };
}

export default ObjectStorage;

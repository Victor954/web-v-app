class LocalStorageMock {

    constructor(private localStore: Record<string , any> = {}) {
        global.Storage.prototype.setItem = jest.fn((key , value) => this.localStore[key] = value);
        global.Storage.prototype.getItem = jest.fn((key) => this.localStore[key]);
    }

    setLocalStore(localStore: Record<string , any>) {
        this.localStore = localStore;
    }

    reset() {

        this.localStore = {};

        (global.Storage.prototype.setItem as jest.Mock).mockClear();
        (global.Storage.prototype.getItem as jest.Mock).mockClear();
    }
}

export default LocalStorageMock;
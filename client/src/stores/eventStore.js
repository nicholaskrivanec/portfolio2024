import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
    state: () => ({
        events: {},
    }),
    actions: {
        emit(eventName, payload) {
            this.events[eventName] = payload; // Then emit the new event
        },
        clear(eventName) {
            delete this.events[eventName];
        },
        consume(eventName, callback) {
            if (this.events[eventName] !== undefined) {
                const payload = this.events[eventName];
                callback(payload);
                this.clear(eventName);
            }
        }
    }
});

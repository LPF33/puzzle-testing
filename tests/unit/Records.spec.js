import { shallowMount, mount } from "@vue/test-utils";
import Records from "@/components/Records.vue";
import "jest-localstorage-mock";

test("Records.vue localStorage gets called with records", () => {
    shallowMount(Records, {});
    expect(localStorage.getItem).toHaveBeenCalledWith("records");
});

const mockLocalStorage = (function() {
    let store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value;
        },
    };
})();

test("When localstorage has key records, values gets printed", () => {
    mockLocalStorage.setItem(
        "records",
        JSON.stringify([
            ["owl", 83222],
            ["owl", 73222],
        ])
    );
    Object.defineProperty(window, "localStorage", {
        value: mockLocalStorage,
    });
    const wrapper = mount(Records, {
        propsData: { puzzleId: "owl" },
    });
    expect(wrapper.vm.$data.records).toEqual([
        ["owl", "01:13"],
        ["owl", "01:23"],
    ]);
    expect(wrapper.html().replace(/\s+/g, "")).toContain(
        `<div><h1>Records</h1><div>1.-01:13min</div><div>2.-01:23min</div></div>`
    );
});

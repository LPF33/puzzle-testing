import { mount } from "@vue/test-utils";
import Puzzles from "@/components/Puzzles.vue";
import Records from "@/components/Records.vue";

test("mount Puzzles component", () => {
    const wrapper = mount(Puzzles);
    expect(wrapper.html()).toMatchSnapshot();
});

test("mount with different data", () => {
    const wrapper = mount(Puzzles, {
        data() {
            return {
                puzzles: [
                    { id: "horse", image: "owl.jpg", title: "Horse" },
                    { id: "egg", image: "eggcozy.jpg", title: "Egg" },
                    { id: "apple", image: "eggcozy.jpg", title: "Apple" },
                ],
            };
        },
    });

    const puzzleClass = wrapper.findAll(".puzzle");
    expect(puzzleClass).toHaveLength(3);

    const h2s = wrapper.findAll("h2");
    expect(h2s).toHaveLength(3);
    expect(h2s[0].html()).toBe("<h2>Horse</h2>");
    expect(h2s[1].html()).toBe("<h2>Egg</h2>");
    expect(h2s[2].html()).toBe("<h2>Apple</h2>");

    const buttons = wrapper.findAll(".play-button");
    expect(buttons).toHaveLength(3);
});

test("when mounted every puzzle has Records component", () => {
    const wrapper = mount(Puzzles);
    const records = wrapper.findAllComponents(Records);
    expect(records).toHaveLength(2);
    expect(records[0].props()).toEqual({ puzzleId: "owl" });
    expect(records[1].props()).toEqual({ puzzleId: "eggcozy" });
});

test("when first play button clicked, event play emitted with first puzzle", async () => {
    const wrapper = mount(Puzzles);
    const buttons = wrapper.findAll(".play-button");
    expect(buttons).toHaveLength(2);
    await buttons[0].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("play");
    expect(wrapper.emitted().play).toEqual([[wrapper.vm.puzzles[0]]]);
});

test("when second play button clicked, event play emitted with second puzzle", async () => {
    const wrapper = mount(Puzzles);
    const buttons = wrapper.findAll(".play-button");
    expect(buttons).toHaveLength(2);
    await buttons[1].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("play");
    expect(wrapper.emitted().play).toEqual([[wrapper.vm.puzzles[1]]]);
});

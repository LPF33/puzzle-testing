import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App";
import Puzzles from "@/components/Puzzles.vue";
import SliderPuzzle from "@/components/SliderPuzzle.vue";

test("App is mounted correctly when initially selectedPuzzle is null", () => {
    const wrapper = mount(App);
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(1);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(0);
});

test("App is mounted correctly when selectedPuzzle is not null", () => {
    const wrapper = shallowMount(App, {
        data() {
            return {
                selectedPuzzle: {},
            };
        },
    });
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(0);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(1);
});

test("When play method is envoked show SliderPuzzle and unmount Puzzles component", async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.play({});
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(0);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(1);
});

test("When setNull method is called, Puzzles component gets rendered and SliderPuzzle gets unmounted", async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.play({});
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(0);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(1);
    wrapper.vm.setNull();
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(1);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(0);
});

test("When Puzzle Owl gets mounted and triggers close -> SliderPuzzle gets unmounted", async () => {
    const wrapper = shallowMount(App);

    wrapper.vm.play({ id: "owl", image: "owl.jpg", title: "Owl" });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();

    wrapper.findComponent(SliderPuzzle).trigger("close");
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.findAllComponents(Puzzles)).toHaveLength(1);
    expect(wrapper.findAllComponents(SliderPuzzle)).toHaveLength(0);
});

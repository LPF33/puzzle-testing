import { mount } from "@vue/test-utils";
import SliderPuzzle from "@/components/SliderPuzzle";
import "jest-localstorage-mock";
jest.useFakeTimers();

afterEach(() => {
    jest.clearAllMocks();
});

test("SliderPuzzle gets rendered with owl object correctly", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
    afterEach(() => {
        jest.clearAllMocks();
    });
});

test("SliderPuzzle gets rendered with eggcozy object correctly", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: {
                id: "eggcozy",
                image: "eggcozy.jpg",
                title: "Egg cozy",
            },
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});

test("store index of image to swap when clicked on any image", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });
    wrapper.find("img").trigger("click");
    expect(wrapper.vm.indexedToSwap.length).toBeGreaterThan(0);
});

const randomNum = () => {
    let nums = [];
    nums.push(Math.floor(Math.random() * 25));

    while (typeof nums[1] === "undefined" || nums[0] === nums[1]) {
        nums[1] = Math.floor(Math.random() * 25);
    }
    return nums;
};

test("swaps two images when 2 random images are clicked", async () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });
    const [firstNum, secondNum] = randomNum();
    const [firstImage, secondImage] = [
        wrapper.vm.shuffledPuzzleArray[firstNum],
        wrapper.vm.shuffledPuzzleArray[secondNum],
    ];
    wrapper.find(`#puzzle img:nth-child(${firstNum + 1})`).trigger("click");
    wrapper.find(`#puzzle img:nth-child(${secondNum + 1})`).trigger("click");
    expect(wrapper.vm.indexedToSwap.length).toBe(0);
    await wrapper.vm.$nextTick();
    const [newFirstImage, newSecondImage] = [
        wrapper.vm.shuffledPuzzleArray[firstNum],
        wrapper.vm.shuffledPuzzleArray[secondNum],
    ];
    expect(firstImage).toBe(newSecondImage);
    expect(secondImage).toBe(newFirstImage);
});

test("starts timer when Component mounted", () => {
    mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });
    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toBeCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test("stops timer when close-button is clicked", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });

    wrapper.find("#close-button").trigger("click");
    expect(clearInterval).toHaveBeenCalledTimes(1);
});

// test("stops timer when component is unmounted", async () => {
//     const wrapper = mount(SliderPuzzle, {
//         props: {
//             puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
//         },
//     });
//     await wrapper.vm.$destroy(); // .beforeUnmount does also not work
//     expect(clearInterval).toHaveBeenCalledTimes(1);
// });

test("save record to local storage", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
        data() {
            return {
                startDateTime: new Date(),
                currentElapsedTime: new Date(),
            };
        },
    });
    wrapper.vm.saveRecord();
    const { startDateTime, puzzleObj } = wrapper.vm;
    const recordsToBeSaved = JSON.stringify([
        [puzzleObj.id, Date.now() - startDateTime],
    ]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
        "records",
        recordsToBeSaved
    );
});

test("shows the elapsed time", () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
        data() {
            return {
                currentElapsedTime: "00:35",
            };
        },
    });
    expect(wrapper.html()).toContain("00:35");
});

test("user has won the game and can restart game", async () => {
    const wrapper = mount(SliderPuzzle, {
        props: {
            puzzleObj: { id: "owl", image: "owl.jpg", title: "Owl" },
        },
    });
    expect(wrapper.vm.checkForWin).toBeFalsy();
    await wrapper.vm.$nextTick();

    expect(clearInterval).toHaveBeenCalledTimes(0);
    wrapper.vm.shuffledPuzzleArray = [...wrapper.vm.correctPuzzleArray];
    expect(wrapper.vm.checkForWin).toBeTruthy();

    await wrapper.vm.$nextTick();
    expect(clearInterval).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    expect(wrapper.find(".user-win-game").exists()).toBeTruthy();
    wrapper.find(".user-win-game button").trigger("click");
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(wrapper.html()).toMatchSnapshot();

    await wrapper.vm.$nextTick();
    expect(wrapper.find(".user-win-game").exists()).toBeFalsy();
    expect(wrapper.html()).toMatchSnapshot();
});

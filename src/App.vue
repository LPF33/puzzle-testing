<template>
    <div id="app">
        <h1>Welcome to the PUZZLE world!</h1>
        <Puzzles v-if="!selectedPuzzle" v-on:play="play" />
        <SliderPuzzle
            :puzzleObj="selectedPuzzle"
            v-if="selectedPuzzle"
            @close="setNull"
        />
    </div>
</template>

<script>
import Puzzles from "./components/Puzzles";
import SliderPuzzle from "./components/SliderPuzzle";

export default {
    name: "App",
    components: {
        Puzzles,
        SliderPuzzle,
    },
    data() {
        return {
            selectedPuzzle: null,
        };
    },
    methods: {
        play(puzzle) {
            this.selectedPuzzle = puzzle;
        },
        setNull() {
            this.selectedPuzzle = null;
        },
    },
};
</script>

<style>
* {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
}
#app {
    background-color: #cdc7be;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

#app > h1 {
    color: #766161;
    text-shadow: 1px 1px 2px black;
    background-color: #e1f1dd;
    padding: 10px 0;
}
</style>

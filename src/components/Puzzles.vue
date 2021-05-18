<template>
    <div id="puzzles-component">
        <h1>Select a puzzle</h1>
        <div v-for="puzzle in puzzles" :key="puzzle.id" class="puzzle">
            <button @click="selectPuzzle(puzzle)" class="play-button">
                <div>
                    <img :src="require(`../assets/${puzzle.image}`)" />
                    <h2>{{ puzzle.title }}</h2>
                </div>
            </button>
            <Records :puzzleId="puzzle.id" />
        </div>
    </div>
</template>

<script>
import Records from "./Records";
export default {
    name: "Puzzles",
    components: {
        Records,
    },
    data() {
        return {
            puzzles: [
                { id: "owl", image: "owl.jpg", title: "Owl" },
                { id: "eggcozy", image: "eggcozy.jpg", title: "Egg cozy" },
            ],
        };
    },
    methods: {
        selectPuzzle(p) {
            this.$emit("play", p);
        },
    },
};
</script>

<style scoped>
#puzzles-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}

.puzzle {
    position: relative;
    display: flex;
    max-width: 100vw;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}

.puzzle img {
    width: 300px;
    max-width: 100vw;
    border-radius: 5px;
}

.play-button {
    width: 800px;
    max-width: 100vw;
    height: 100%;
    background-color: #87a7b3;
    cursor: pointer;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
}

.play-button h2 {
    color: #766161;
    text-shadow: 1px 1px 2px black;
}

h1 {
    color: #766161;
    text-shadow: 1px 1px 2px black;
    background-color: #e1f1dd;
    padding: 10px 0;
    margin-bottom: 10px;
}
</style>

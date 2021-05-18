<template>
    <h3>"{{ puzzleObj.title }}" puzzle (25 pieces)</h3>
    <h4>Elapsed Time: {{ currentElapsedTime }}</h4>
    <div v-if="checkForWin" class="user-win-game">
        <h3>You have solved the puzzle!!!</h3>
        <button @click="restart">Play again</button>
    </div>
    <div id="puzzle">
        <img
            v-for="(piece, index) of shuffledPuzzleArray"
            :key="index"
            :src="require(`../assets/${puzzleObj.id}/${piece}`)"
            @click="swapImg(index)"
        />
    </div>
    <button @click="closePuzzle" id="close-button">X</button>
</template>

<script>
const correctPuzzleArray = [
    "image_part_001.jpg",
    "image_part_002.jpg",
    "image_part_003.jpg",
    "image_part_004.jpg",
    "image_part_005.jpg",
    "image_part_006.jpg",
    "image_part_007.jpg",
    "image_part_008.jpg",
    "image_part_009.jpg",
    "image_part_010.jpg",
    "image_part_011.jpg",
    "image_part_012.jpg",
    "image_part_013.jpg",
    "image_part_014.jpg",
    "image_part_015.jpg",
    "image_part_016.jpg",
    "image_part_017.jpg",
    "image_part_018.jpg",
    "image_part_019.jpg",
    "image_part_020.jpg",
    "image_part_021.jpg",
    "image_part_022.jpg",
    "image_part_023.jpg",
    "image_part_024.jpg",
    "image_part_025.jpg",
];
export default {
    name: "SliderPuzzle",
    props: ["puzzleObj"],
    data() {
        return {
            correctPuzzleArray,
            shuffledPuzzleArray: [...correctPuzzleArray].sort(
                () => Math.random() - 0.5
            ),
            timerId: null,
            indexedToSwap: [],
            startDateTime: Date.now(),
            currentElapsedTime: null,
        };
    },
    mounted() {
        this.timerId = setInterval(this.elapsedTime, 1000);
    },
    beforeUnmount() {
        console.log("destroyed");
        clearInterval(this.timerId);
    },
    emits: ["close"],
    methods: {
        closePuzzle() {
            clearInterval(this.timerId);
            this.$emit("close");
        },
        elapsedTime() {
            const elpased = new Date(Date.now() - this.startDateTime);
            this.currentElapsedTime = elpased.toISOString().slice(14, 19);
        },
        swapImg(index) {
            if (this.indexedToSwap.length < 2) {
                this.indexedToSwap.push(index);
            }

            if (this.indexedToSwap.length === 2) {
                const [first, second] = this.indexedToSwap;
                [
                    this.shuffledPuzzleArray[first],
                    this.shuffledPuzzleArray[second],
                ] = [
                    this.shuffledPuzzleArray[second],
                    this.shuffledPuzzleArray[first],
                ];

                this.indexedToSwap = [];
            }
        },
        saveRecord() {
            try {
                const records =
                    JSON.parse(localStorage.getItem("records")) || [];
                records.push([
                    this.puzzleObj.id,
                    Date.now() - this.startDateTime,
                ]);
                localStorage.setItem("records", JSON.stringify(records));
            } catch (error) {
                console.log("could not save record");
            }
        },
        restart() {
            this.shuffledPuzzleArray = [...correctPuzzleArray].sort(
                () => Math.random() - 0.5
            );
            this.startDateTime = Date.now();
            this.timerId = setInterval(this.elapsedTime, 1000);
        },
    },
    computed: {
        checkForWin() {
            for (let i = 0; i < correctPuzzleArray.length; i++) {
                if (correctPuzzleArray[i] !== this.shuffledPuzzleArray[i]) {
                    return false;
                }
            }
            clearInterval(this.timerId);
            this.saveRecord();
            return true;
        },
    },
};
</script>
<style scoped>
#puzzle {
    display: grid;
    grid-template: repeat(5, minmax(50px, 100px)) / repeat(
            5,
            minmax(50px, 100px)
        );
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

#puzzle img {
    width: 100%;
    height: 100%;
}

#close-button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #766161;
    color: white;
    font-weight: bold;
}

h3 {
    color: #766161;
    text-shadow: 1px 1px 2px black;
    background-color: #e1f1dd;
    padding: 10px 0;
}

h4 {
    color: black;
    text-shadow: 1px 1px 2px black;
    padding: 10px 0;
}
</style>

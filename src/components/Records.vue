<template>
    <div>
        <h1>Records</h1>
        <div v-for="(record, index) of records" :key="index">
            {{ index + 1 }}. - {{ record[1] }} min
        </div>
    </div>
</template>
<script>
export default {
    name: "Records",
    props: ["puzzleId"],
    data() {
        return {
            records: [],
        };
    },
    created() {
        this.getRecords();
    },
    methods: {
        getRecords() {
            try {
                let storedRecords = JSON.parse(localStorage.getItem("records"));

                const sortedRecords = storedRecords
                    .filter((item) => item[0] == this.puzzleId)
                    .sort((a, b) => a[1] - b[1])
                    .map((item) => {
                        const milli = new Date(item[1]);
                        item[1] = milli.toISOString().slice(14, 19);
                        return item;
                    });
                this.records = sortedRecords;
            } catch (error) {
                this.records = [];
            }
        },
    },
};
</script>
<style scoped>
div,
h1 {
    text-shadow: 1px 1px 2px black;
}
h1 {
    border-bottom: 1px dashed black;
    margin-bottom: 10px;
}
</style>

<template>
    <div class="col-md-4 no-padding d-flex d-flex-align-center">
        <label class="mr-1 mb-0">Sort</label>
        <select :value="value" @change="onChange" class="form-control">
            <option v-for="(option,index) in sortOptions" :key="index" :value="option.value">{{option.label}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SortComponent",
    props: {
        value: String
    },
    data: function() {
        return {
            activeSort: "byDescriptionAsc",
            sortOptions: [
                    {
                        label: "Description (A-Z)",
                        value: "byDescriptionAsc"
                    },
                    {
                        label: "Description (Z-A)",
                        value: "byDescriptionDesc"
                    },
                    {
                        label: "Part # (Low to High)",
                        value: "byPartNumberAsc"
                    },
                    {
                        label: "Part # (High to Low)",
                        value: "byPartNumberDesc"
                    }
            ],
        }


    },
    methods: {
        onChange(e) {
            this.$emit('updateActiveSort', e.target.value)
        }
    }
}
</script>
<style>

</style>
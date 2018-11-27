<template>
    <div class="col-md-12 no-padding filters-wrapper">
        <div class="col-md-12">
            <h3>Categories</h3>
            <label v-for="(filter,index) in filters" :key="index" class="label-custom">
                    <input type="radio" :value="filter.category" v-model="currentFilter">
                    <b>{{filter.category}}</b>
            </label>
        </div>

        <div class="col-md-12 reset-filters-wrapper">
            <button class="btn btn-danger" @click="removeFilters" v-if="currentFilter != ''">Reset Filters</button>
        </div>
    </div>
</template>


<script>

import store from '../store.js'


export default {
    name: "Filters",
    store,
    data: function() {
        return {
            currentFilter: "",
            filters: store.getters.GET_FILTERS,
            parts: store.getters.GET_PARTS

        }
    },
    watch: {
        currentFilter: function(val) {
            if(val != "") {
                console.log(val);
                store.commit("UPDATE_APPLIED_FILTER" , val);
                store.dispatch("filterPartsByCategory" , val);
            } 
        }
    },
    methods: {
        removeFilters() {
            store.dispatch("removeFilters" , "");
            this.currentFilter = "";
            // store.dispatch("loadParts");
        }
    }
}

</script>
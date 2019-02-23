<template>
    <div class="col-md-12 no-padding filters-wrapper">
        <div class="col-md-12">
            <h3>Categories</h3>
            <label v-for="(filter,index) in filters" :key="index" class="label-custom">
                    <input type="radio" :value="filter.category" @change="updateFilter(filter)" v-model="currentFilter">
                    <b>{{filter.category}}</b>
            </label>
        </div>

        <div class="col-md-12 reset-filters-wrapper">
            <button class="btn btn-danger" @click="removeFilters" v-if="currentFilter != ''">Reset Categories</button>
        </div>
    </div>
</template>


<script>

import store from '../store.js'
import vuex from 'vuex'
import { mapActions } from 'vuex'


export default {
    name: "Filters",
    store,
    data: function() {
        return {
            filters: store.getters.GET_FILTERS,
            parts: store.getters.GET_PARTS
        }
    },
    methods: {

        ...mapActions([
            'removeFilters',
            'filterPartsByCategory'
        ]),


        // ...mapActions({
        //     removeFilters: 'removeFilters',
        //     updateFilter: 'filterPartsByCategory(store.getters.GET_CURRENT_SORT , store.getters.GET_FILTERS)'
        // }),


        removeFilters() {
            store.dispatch("removeFilters" , "");
        },
        updateFilter(filter) {
            store.dispatch("filterPartsByCategory" , filter.category);
        }
    },
    computed : {
        currentFilter: {
            // we only need to have a get on the current filter - we are using it just for the v-model of the radios
            // we update the current filter property in VUEX , so the v-model will be set correctly  
            get(){ return store.getters.GET_CURRENT_FILTER },
            set( value ){} 
        }
    }
}

</script>
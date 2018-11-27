<template>
    <div class="col-md-12">

        <div class="col-md-12 paginator-items-count" v-if="$refs.paginator && _parts.length > 0">
            <div class="col-md-4 pt-05">
                <span class="pt-05">Viewing {{$refs.paginator.pageItemsCount}} results</span>
            </div>
            <!-- @updateActiveSort represents the $emit event coming from SortComponent
                  updateActiveSort is the method that binds together the current value of the sort
            <SortComponent :value="activeSort" @updateActiveSort="updateActiveSort"/>
            -->
            <SortComponent/>

            <div class="col-md-4 d-flex d-flex-justify-end">
                <button class="btn btn-default mr-1" @click="makeList(true)"><i class="fa fa-th-list text-primary-color"></i></button>
                <button class="btn btn-default" @click="makeList(false)"><i class="fa fa-th text-primary-color"></i></button>
            </div>
		</div>

        <div class="col-md-12" v-if="_parts.length > 0">
            <paginate ref="paginator" name="_parts" :list="_parts" :per="itemsToShow" class="col-md-12 paginate-list d-flex d-flex-wrap">
                <Part v-for="(part,index) in paginated('_parts')" :part="part" :key="index" :list="isList"/>
            </paginate>

            <!-- Pagination links -->
	        <paginate-links class="col-xs-12 d-flex d-flex-justify-space-between" for="_parts" :show-step-links="true" :step-links="{next: '>>',prev: '<<'}"></paginate-links>
        </div>

        <div class="col-md-12" v-else>
            <span class="col-md-12 no-results">No results matched your filter criteria</span>
        </div>

    </div>
</template>

<script>


import Part from './Part.vue'
import SortComponent from './Sort.vue' 
import store from '../store.js'
import Vue from 'vue'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)

import {mapState , mapGetters} from 'vuex'

export default {
    name: "Parts",
    store,
    props: {
        refine: String,
        activeFilter: String
    },
    components: {
        Part,
        SortComponent,
        VuePaginate
    },
    mounted: function() {
        // console.log("Parts Component Mounted");
        // console.log(store);
    },
    data: function() {
        return {
            paginate: ["_parts"],
            activeSort: "byDescriptionAsc",
            isList: true,
            itemsToShow: 10
        }

    },
    methods: {
        updateActiveSort(value) {
            this.activeSort = value;
        },
        makeList: function(param) {      
            param == true ? this.isList = true : this.isList = false;
            param == true ? this.itemsToShow = 10 : this.itemsToShow = 12;
        }
    },

    mounted() {
        store.commit("SORT_DYNAMICALLY" , this.activeSort)
    },

    computed: {

        _parts: function() {
            let temp = store.getters.GET_PARTS


            if(this.refine) {


                temp = temp.filter(o => {
                    return o.name.toLowerCase().includes(this.refine.toLowerCase()) ||
                           o.number.toLowerCase().includes(this.refine.toLowerCase())
                });

            }

            return temp;
            
        }

    },

    watch: {
        refine: function(val) {
            this.$refs.paginator.goToPage(1);
        }
    }
}
</script>
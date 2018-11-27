import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex);

// Vuex Store
const store = new Vuex.Store({
    state: {
      parts: [],
      // original dataset
      origin: [],
      appliedFilter: "",
      appliedSort:"byDescriptionAsc",
      // hardcoded filters
      filters: [
        {
          category : "Slideouts",
          count: 0
        },
        {
          category : "Cabinets",
          count: 0
        },
        {
          category : "Electrical",
          count: 0
        },
        {
          category : "Plumbing",
          count: 0
        },
        {
          category : "Exterior",
          count: 0
        },
        {
          category : "Final",
          count: 0
        },
        {
          category : "Roof",
          count: 0
        },
        {
          category : "Shelling",
          count: 0
        },
        {
          category : "Floors",
          count: 0
        },
        {
          category : "Chassis",
          count: 0
        },
        {
          category : "Miscellaneous",
          count: 0
        },
        {
          category : "Appliances",
          count: 0
        },
        {
          category : "Audio Visual",
          count: 0
        },
      ]
    },
  
    mutations: {
        SET_PARTS (state,parts) {
            state.parts = parts
        },

        SET_ORIGIN (state,parts) {
            state.origin = parts
        },
        
        UPDATE_APPLIED_FILTER(state , filter) {
          state.appliedFilter = filter;
        },

        UPDATE_APPLIED_SORT(state , sort) {
          state.appliedSort = sort;
        },

        SORT_DYNAMICALLY(state , sort) {
          switch(sort) {
            case "byDescriptionAsc" :
                state.parts.sort((a,b) => { return a.name > b.name ? 1 : -1 })
            break;

            case "byDescriptionDesc" : 
                state.parts.sort((a,b) => { return a.name < b.name ? 1 : -1 })
            break;

            case "byPartNumberAsc" :
                state.parts.sort((a,b) => { return +parseInt(a.number) - +parseInt(b.number)})
            break;

            case "byPartNumberDesc" :
                state.parts.sort((a,b) => { return +parseInt(b.number) - +parseInt(a.number)})
            break;
        }
        
        },
				
				SET_PART_FAVORITE (state,part) {

					state.parts.reduce((r,v,k) => {
						if(part.id == v.id) {
							v.isFavorite = true;
						}
						r = [...r , v];
						return r;
					},[]);
		
				
					// update part is Favorite with Ajax call /Default.aspx?ID=FAVID&ADDToFavorite..
					// use promise , and if the promise status is ok , make the reduce on the state.parts
				},
		
		
				REMOVE_PART_FAVORITE (state,part) {
					state.parts.reduce((r,v,k) => {
						if(part.id == v.id) {
							v.isFavorite = false;
						}
						r = [...r , v];
						return r;
					},[]);
		
					// update part is Favorite with Ajax call /Default.aspx?ID=FAVID&REMOVEToFavorite..
        }
        
        
  
    },
  
    actions: {
        loadParts ({ commit }) {

            axios.get("http://localhost:4000/data")
                 .then(r => r.data)
                 .then(parts => {


                  // sort the parts byDescriptionAsc by default
                  parts.sort((a,b) => { return a.name > b.name ? 1 : -1 });


                   commit("SET_PARTS" , parts)
                   commit("SET_ORIGIN" , parts)
                 })
                 .catch(err => console.log(err))
        },

        filterPartsByCategory ({ commit , state } , params ) {
            let out = state.origin.filter(o => o.parentGroupNames.includes(params.currentFilter))
            commit("SET_PARTS" , out);    
            commit("UPDATE_APPLIED_FILTER" , params.currentFilter);
            commit("SORT_DYNAMICALLY" , state , params.currentSort);
        },

        setSortFilter ({ commit , state } , currSort) {
          console.log("WILL UPDATE WITH AND TRIGER : " , currSort)
          // commit("UPDATE_APPLIED_SORT" , state.appliedSort);
        },

        removeFilters ({ commit , state }) {
          // when reseting filters , show original array of parts - and original sorting
          commit("SET_PARTS" , state.origin)
          commit("UPDATE_APPLIED_FILTER" , "")
          console.log(state.appliedSort);
        }
  
    },
  
    getters: {
  
      GET_PARTS: state => {
        // when passing parts to the computed property
        // update the parts with minimum quantity
        return state.parts.reduce((r,v,k) => {
          v.hasOwnProperty("customField_MinimumQuantity") ? v._quantity = v.customField_MinimumQuantity : v._quantity = 1;
          r = [...r,v];
          return r;
        },[]);
      },

      GET_FILTERS: state => {
        return state.filters
      },

      GET_CURRENT_FILTER: state => {
        return state.appliedFilter
      },

      GET_CURRENT_SORT: state => {
        return state.appliedSort
      }
      
    }
  })

  
  export default store;
<template>
  <div class="container" id="app">
    <div class="row">
      <!-- Serial # Search Input Wrapper -->
    </div>

    <h3>Active filter {{activeFilter}}</h3>
    <h3>Refine Search {{refineSearch}}</h3>

    <div class="row">


     
      <div class="col-md-12">

        <!-- Refine Search & Filters Wrapper -->
        <div class="col-md-3 no-padding">
          <div class="col-md-12 no-padding">
            
            <div class="col-md-12 text-left no-padding">
              <label>Refine Search</label>
            </div>

            <div class="col-md-12 d-flex d-flex-align-center no-padding">
              <input type="text" class="form-control" v-model="refineKeyword">
              <i class="fa fa-search refine-search-submitter" @click="handleRefineSearch"></i>
            </div>

          </div>

          <div class="col-md-12 no-padding">
            <Filters/>
          </div>
        </div>

        <!-- Results Wrapper -->
        <div class="col-md-9">
            <Parts :refine="refineSearch"/>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Parts from './components/Parts.vue'
import Filters from './components/Filters.vue'
import store from './store.js'


export default {
  name: 'app',
  data: function() { 
    return {
      refineSearch: "",
      refineKeyword: "",
      defaultSort: store.getters.GET_CURRENT_SORT,
    }
    
  },
  store,
  components: {
    Parts,
    Filters
  },
  methods: {
    handleRefineSearch() {
      let query = this.refineKeyword;

      if(query != "") {
        this.refineSearch = query;
      }
    }
  },
  computed: {
    activeFilter : {
      get() {
        return store.getters.GET_CURRENT_FILTER
      }
    }
  },
  mounted() {
    // fetch parts when App loads
    this.$store.dispatch("loadParts")
  },
  watch : {
    refineKeyword(val) {
      if(val == "") {
        console.log("update refine search");
        this.refineSearch = "";
      }
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.refine-search-submitter {
  padding: 0.65em;
  border: 1px solid;
  border-radius: 15%;
}

.text-left {
  text-align: left;
}

.no-padding {
  padding: 0;
}

.label-custom {
  width: 100%;
  text-align: left;
  margin: 0;
  padding: 0.5em;
  display: flex;
  align-items: center;
  color: white;
  border-bottom: 1px solid white;
}

.label-custom b {
  margin-left: 0.5em;
}

.label-custom input[type='radio'] {
  margin: 0;
}

.filters-wrapper {
  background: linear-gradient(to right, #457fca, #5691c8);
  margin-top: 1em;
}

.filters-wrapper h3 {
  margin: 0;
  text-align: left;
  padding: 0.5em;
  color: white;
  border-bottom: 3px solid white;
}

.reset-filters-wrapper button {
  float: left;
  margin: 1em 0em;
}

.no-results {
  padding: 1em;
  color: white;
  background: linear-gradient(to right, #457fca, #5691c8);
  margin-top: 5.20em;
}

.paginator-items-count {
  padding: 1em;
  color: white;
  background: linear-gradient(to right, #457fca, #5691c8);
  margin: 1em 1em 2em 1em;
}

.mb-0 {
  margin-bottom: 0;
}

.pt-05 {
  padding-top: 0.5em;
}

.text-primary-color { 
  color: #457fca;
}

.d-flex-justify-end {
  justify-content: flex-end;
}

.w-75 {
  width: 75px;
}

</style>




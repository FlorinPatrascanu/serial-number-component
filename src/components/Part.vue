<template>
<li class="part-result" v-bind:class="{'col-xs-12' : list , 'col-xs-3' : !list }">
    <div v-bind:class="{'col-xs-2' : list , 'col-xs-12' : !list }">
        <img :src="part.image" class="img-responsive">
    </div>

    <div v-bind:class="{'col-xs-6' : list , 'col-xs-12' : !list }">
        <p class="part-number">{{part.number}}</p>
        <p class="part-name">{{part.name}}</p>
        <p v-if="!list" class="part-price">{{part.price}}</p>
        <div v-if="list" class="d-flex">
            <p v-if="parseInt(part.stock) > 0" class="part-stock">
                <i class="fa fa-check"></i> {{part.stock}} available
            </p>
        </div>
    </div>

    <div v-bind:class="{'col-xs-4' : list , 'col-xs-12' : !list }">
        <div class="col-xs-12 d-flex d-flex-justify-end">
            <p v-if="list" class="part-price">{{part.price}}</p>
        </div>
        <div class="col-xs-3 no-padding">
            <!-- B2C Scenario -->
            <input type="number" class="form-control w-75" 
                                :value="part._quantity" 
                                :min="part._quantity" 
                                :max="part.stock" 
                                :step="part._quantity" 
                                @change="quantityHandler(part , $event)" />
            <button class="btn btn-default remove-from-fav" v-if="part.isFavorite == true" v-on:click="removeFromFav(part)">
				<i class="fa fa-heart"></i>
			</button>
            <button class="btn btn-default add-to-favorite" v-else v-on:click="addToFav(part)">
													<i class="fa fa-heart-o"></i>
												</button>
        </div>

        <div class="col-xs-9" v-bind:class="{'d-flex d-flex-justify-end' : list}">
            <button class="btn btn-default add-to-cart" v-if="parseInt(part.stock) > 0">
												Add To Cart
												</button>
            <p v-else>Out of stock</p>
        </div>
    </div>
</li>
</template>

<script>

import store from '../store.js'

export default {
    name: "Part",
    store,
    props: {
        part: Object,
        list: Boolean
    },
    methods: {
        addToFav: function(part) {
            store.commit("SET_PART_FAVORITE" , part);
        },

        removeFromFav: function(part) {
            store.commit("REMOVE_PART_FAVORITE" , part);
        },

        quantityHandler: function(part , event) {
            // console.log(part);

            let range = [];
            let min = parseInt(part._quantity);
            let max = parseInt(part.stock);
            let req = event.currentTarget.value;

            for(let i = min; i <= max; i = i + min) {
                range = [...range,i];
            }


            // rounding to the nearest incremental value in the range array
            let curr = range[0];
            let diff = Math.abs(req - curr);

            for(let i = 0; i < range.length; i++) {
                let newDiff = Math.abs(req - range[i])
                if (newDiff < diff) {
                    diff = newDiff;
                    curr = range[i];
                }
                
            }

            event.currentTarget.value = curr;
           
        },
    }
}


</script>

<style>
.no-padding {
    padding: 0 !important;
}

.part-result {
    margin-bottom: 1em;
}

.d-flex {
    display: flex;
}

.d-flex-wrap {
    flex-wrap: wrap;
}

.d-flex-align-center {
    align-items: center;
}  

.d-flex-justify-space-between {
    justify-content: space-between;
}

.d-flex-justify-end {
    justify-content: flex-end;
}  

.mr-1 {
  margin-right: 1em;
}

.m-1-0 {
  margin: 1em 0em;
}


ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.paginate-links {
    background: linear-gradient(to right, #457fca, #c89056);
    padding: 1em !important;
    margin-bottom: 1em !important;
}


.paginate-links .left-arrow a , .paginate-links .right-arrow a {
    color: white;
    cursor: pointer;
}

.paginate-links .left-arrow.disabled a , .paginate-links .right-arrow.disabled a {
    color: white;
    cursor: not-allowed;
}

.paginate-links li.number {
    border: 2px solid white;
    padding: 0.25em;
    height: 25px;
    width: 25px;
    text-align: center;
    border-radius: 50%;
    line-height: 12px;
}

.paginate-links .number a {
    color: white;
    cursor: pointer;
}

.paginate-links .number.active a {
    color: black;

} 
</style>

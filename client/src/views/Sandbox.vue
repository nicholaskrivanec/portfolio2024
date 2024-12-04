<template>
  <menu-bar></menu-bar>
  <div class="main-area flex-container" :style="{ paddingLeft: padding }">
    <div id="wrapper" class="">
      <card-slot v-for="x in foods" :key="x.id">
        <img :src="x.url" draggable="false">
        <h4>{{x.name}}</h4>
        <p>{{x.desc}}</p>
      </card-slot>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

  export default {
    name: "Sandbox"
    ,props:{

    }
    ,data() {
      return {
        foods: [
        {id: uuidv4(),  name: 'Apple', desc: 'Apples are a type of fruit that grow on trees.', url: 'img_apple.svg'},
        {id: uuidv4(),  name: 'Pizza', desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.', url: 'img_pizza.svg'},
        {id: uuidv4(),  name: 'Rice', desc: 'Rice is a type of grain that people like to eat.', url: 'img_rice.svg'},
        {id: uuidv4(),  name: 'Fish', desc: 'Fish is an animal that lives in water.', url: 'img_fish.svg'},
        {id: uuidv4(),  name: 'Cake', desc: 'Cake is something sweet that tates good but is not considered healthy.', url: 'img_cake.svg'}
      ]
      }
    }
    ,methods: {
      fib(n, x=1, y=1) { return ( !n || n <= 1 ) ? y : this.fib( --n, y, x+y ); }
      ,testFib(){
        var list = [];

        for(let i = 0; i < 12; i++)
          list.push(this.fib(i));

        console.log("fibonacci values: " + list);
        

      }
    }
    ,mounted(){
      this.testFib();
    }
  }
</script>

<style>
  #wrapper {
    display: flex;
    flex-wrap: wrap;
    color: black;
  }
  #wrapper img {
    display: block; 
    margin: auto; 
    width: 60%;
  }
</style>   
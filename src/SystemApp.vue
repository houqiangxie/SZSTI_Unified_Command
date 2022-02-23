<template>
<div>
  <NavBar></NavBar>
  <router-view class="h-[calc(100vh-80px)] overflow-auto w-full"></router-view>
</div>
</template>


<script setup lang="ts">
import NavBar from '@/components/system/NavBar.vue'
//  import { useTestStore } from './store/text'
//  const store:any =useTestStore()
  // let {testA,testB,testC}  =toRefs(store)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

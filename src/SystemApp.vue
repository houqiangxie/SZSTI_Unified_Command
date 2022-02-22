<template>
<div>
  System 
  <router-view></router-view>
</div>
</template>


<script setup lang="ts">
//  import { useTestStore } from './store/text'
//  const store:any =useTestStore()
  // let {testA,testB,testC}  =toRefs(store)
  const clickBtn: (e:any) =>void=(e:any)=>{
    console.log(e);
  }
  const htmlContent :string =`
    <div>233233
    <div>23232
    <br/>
      <button onclick="clickBtn">按钮</button>
    </div>
  </div>
  `;
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

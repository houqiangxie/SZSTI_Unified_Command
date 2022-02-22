<template>
    <div class="draggable-box">
        <div class="draggable" draggable="true" v-for="item in componentList" :data-name="item.name">{{item.name}}</div>
    </div>
    <div>
        <div class="grid grid-cols-3">
            <div class="span-1"><Table class="w-full" /></div>
            <div class="span-1"></div>
            <div class="span-1"><Table  class="w-full"/></div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
const files = import.meta.globEager('/src/components/system/moduleComponentList/*.vue')
const componentList = []; // 轮廓线数据
const component = {}; // 轮廓线数据
Object.keys(files).forEach((key) => {
  const name = key.replace(/\/src\/components\/system\/moduleComponentList\/|\.vue/g,'');
    component.name=files[key].default || files[key]
    componentList.push({ component:files[key].default || files[key],name});
});

</script>
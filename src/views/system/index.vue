<template>
    <div>
        <div class="grid grid-cols-3">
            <div class="span-1"><Table class="w-full" /></div>
            <div class="span-1"></div>
            <div class="span-1"><Table  class="w-full"/></div>
        </div>
        <draggable v-model="likeList" item-key="id">
            <template #item="{ element }">
                <div class="item">{{ element.id + "、" + element.name }}</div>
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
const likeList = [
    {id:1,name:'事件详情'},
    {id:2,name:'事件详情2'},
    {id:3,name:'事件详情3'},
    {id:4,name:'事件详情4'},
    {id:5,name:'事件详情5'},
]
</script>
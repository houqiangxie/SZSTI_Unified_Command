<template>
<div>
    <div class="grid grid-cols-12 h-full gap-5 bg-[#f1f3f6]">
        <div class="col-span-3 bg-white px-4">
            <div class="h-[90px] leading-[90px]">主菜单</div>
            <div class="color-[#acacac] leading-[60px]" @click="toPage('ComponentCenter')"><Plus  class="w-[14px] h-[14px] color-[#acacac]"></Plus>组件布局</div>
            <div class="color-[#acacac] leading-[60px]"><Plus  class="w-[14px] h-[14px] color-[#acacac]"></Plus>终端布局</div>
            <div class="color-[#acacac] pl-2 leading-[40px]">布局一</div>
            <div class="color-[#acacac] pl-2 leading-[40px]">布局二</div>
            <div class="color-[#acacac] pl-2 leading-[40px]">布局三</div>
        </div>
        <div class="col-span-9 bg-white">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue"
const router = useRouter()
const toPage = (name:string) =>{
    router.push({name})
}

</script>
<template>
    <!-- <div class="flex bg-white p-4" @click="addNewLight(longLight)"> -->
    <div class="flex bg-white flex-col">
        <div class="flex p-4 w-full justify-center text-xl">Projectors</div>
        <div class="flex flex-row w-full justify-center">
            <div class="w-24 h-12 mx-2 bg-green-200 flex justify-center align-center rounded-xl text-center"
                @click="addNewLight()">
                <p>add new light</p>
            </div>
            <div class="w-24 h-12 mx-2 bg-blue-100 flex justify-center align-center rounded-xl text-center"
                @click="writeOutLight()">
                <p>write out light</p>
            </div>
        </div>
        <div class="flex flex-col">
            <div v-for="eachLight in lights" class="p-4 flex flex-col">
                <LightForm :eachLight="eachLight" />
            </div>
        </div>


    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import { useLabStore } from '../../store/lab'
import LightForm from './LightForm.vue';

export default defineComponent({
    name: "Lights",
    setup() {
        const labStore = useLabStore();
        const { lights } = storeToRefs(labStore);
        const { addNewLight, writeOutLight } = labStore;
        return { addNewLight, writeOutLight, lights };
    },
    components: { LightForm }
})
</script>
<style scoped>

</style>
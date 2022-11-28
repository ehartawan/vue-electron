<template>
    <div class="flex bg-white flex-col">
        <div class="flex p-4 w-full justify-center text-xl">Projectors</div>
        <div class="flex flex-row w-full justify-center">
            <div class="w-24 h-12 mx-2 bg-green-200 flex justify-center align-center rounded-xl text-center"
                @click="addNewProjector()">
                <p>add new projector</p>
            </div>
            <div class="w-24 h-12 mx-2 bg-blue-100 flex justify-center align-center rounded-xl text-center"
                @click="writeOutProjector()">
                <p>write out projector</p>
            </div>
        </div>
        <div class="flex flex-col">
            <div v-for="eachProjector in projectors" class="p-4 flex flex-col">
                <ProjectorForm :eachProjector="eachProjector" />
            </div>
        </div>


    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import { useLabStore } from '../../store/labStore'
import ProjectorForm from './ProjectorForm.vue';

export default defineComponent({
    name: "Projectors",
    setup() {
        const labStore = useLabStore();
        const { projectors } = storeToRefs(labStore);
        const { addNewProjector, writeOutProjector } = labStore;
        return { addNewProjector, writeOutProjector, projectors };
    },
    components: { ProjectorForm }
})
</script>
<style scoped>

</style>
<template >
    <div class="projectorForm">
        <form @submit.prevent="addNewProjector()" class="flex p-2 m-2 flex-col">
            <label for="projectorId">id</label>
            <input v-model="eachProjector.id" class='border-2' type="text" id="projectorId" />
            <label for="projectorName">name</label>
            <input v-model="eachProjector.name" class='border-2' type="text" id="projectorName" />
            <label for="projectorRoom">room</label>
            <input v-model="eachProjector.room" class='border-2' type="text" id="projectorRoom" />
            <label for="projectorAutomationGroup">ipAddress</label>
            <input v-model="eachProjector.ipAddress" class='border-2' type="text" id="projectorAutomationGroup" />
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useLabStore } from '../../store/labStore'

export default defineComponent({
    name: "ProjectorForm",
    props: ['eachProjector'],
    setup() {
        const labStore = useLabStore();
        const { addNewProjector } = labStore;
        return { addNewProjector };
    }
})

</script>
<style lang="">
    
</style>
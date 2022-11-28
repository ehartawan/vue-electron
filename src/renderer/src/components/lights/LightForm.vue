<template >
    <div class="lightForm">
        <form @submit.prevent="addNewLight()" class="flex p-2 m-2 flex-col">
            <label for="lightId">id</label>
            <input v-model="eachLight.id" class='border-2' type="text" id="lightId" />
            <label for="lightName">name</label>
            <input v-model="eachLight.name" class='border-2' type="text" id="lightName" />
            <label for="lightRoom">room</label>
            <input v-model="eachLight.room" class='border-2' type="text" id="lightRoom" />
            <label for="lightAutomationBase">auto base</label>
            <input v-model="eachLight.automationBase" class='border-2' type="text" id="lightAutomationBase" />
            <label for="lightAutomationGroup">auto group</label>
            <input v-model="eachLight.automationGroup" class='border-2' type="text" id="lightAutomationGroup" />
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useLabStore } from '../../store/labStore'

export default defineComponent({
    name: "lightForm",
    props: ['eachLight'],
    setup() {
        const labStore = useLabStore();
        const { addNewLight } = labStore;
        return { addNewLight };
    }
})

</script>
<style lang="">
    
</style>
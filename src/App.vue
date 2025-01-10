

<template>
  <div id="header">
    <button @click="setView('create')">Generar boleto</button>
    <button @click="setView('list')">Lista de boletos</button>
    <button @click="setView('scan')">Escanear boletos</button>
  </div>
  <Generate v-if="view === 'create'" />
  <List v-if="view === 'list'" />
  <Scan v-if="view === 'scan'" />
</template>

<script>
import Generate from '@/components/Generate.vue'
import List from '@/components/List.vue'
import Scan from '@/components/Scan.vue'
import { ref } from 'vue'

export default {
  components: {
    Scan,
    List,
    Generate,
  },
  name: 'App',
  setup() {

    const view = ref('create')
    const setView = (newView) => {
      view.value = newView
    }

    return {
      view,
      setView,
      msg: 'Hello Vite + Vue 3!',
    }
  },
}


</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

.column {
  display: flex;
  flex-direction: column;
}

.mt-10 {
  margin-top: 10px;
}
</style>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  top: 0;
  gap: 10px;
  /* position: absolute; */
  width: fit-content;
}
</style>

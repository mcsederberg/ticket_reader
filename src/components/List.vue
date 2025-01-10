<template>
  <div id="listBody">
    <div v-for="ticket in tickets" class="ticket">
      <p>{{ ticket.name }}</p>
      <img :src="ticket.qr" />
      {{ ticket.scanned ? 'Escaneado' : 'No escaneado' }}
    </div>
  </div>
</template>

<script>
import { ref as vueref } from 'vue'

import { ref, child, get } from "firebase/database";
import { db } from "@/assets/firebase";
export default {
  components: {
  },
  name: 'List',
  setup() {

    const fetchAllTickets = async () => {
      return new Promise((resolve, reject) => {
        try {
          const dbRef = ref(db);
          get(child(dbRef, 'tickets')).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              resolve(snapshot.val());
            } else {
              console.log("No data available");
              resolve([]);
            }
          }).catch((error) => {
            console.error(error);
            reject(error);
          });
        } catch (error) {
          console.error("Error fetching tickets: ", error);
          reject(error);
        }
      })
    };

    const tickets = vueref([]);
    const init = async () => {
      console.log("Starting to get tickets");
      tickets.value = await fetchAllTickets();
      console.log(tickets.value);

    }
    init();
    return {
      tickets
    }
  },
}


</script>

<style>
#listBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}
</style>

<style scoped></style>

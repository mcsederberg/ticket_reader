<template>
  <div id="scannerWrapper" :style="{ 'background-color': backgroundColor }" v-if="scannedTicket">
    <p>{{ scannedTicket.name }}</p>
    <!-- <img :src="scannedTicket.qr" /> -->
    {{ scannedTicket.scanned ? 'Escaneado' : 'No escaneado' }}
  </div>
  <div v-show="!scannedTicket" id="qr-code-full-region"></div>
</template>

<script>
import { ref as vueref, onMounted, } from 'vue'

import { ref, child, get, update, } from "firebase/database";
import { db } from "@/assets/firebase";
import QrCode from 'qrcode-reader';

export default {
  components: {
  },
  name: 'Scan',
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

    const scannedTicket = vueref(null);

    const backgroundColor = vueref('white');

    const onScanSuccess = async (decodedText, decodedResult) => {
      console.log(`Scan result: ${decodedText}`);
      console.log(decodedResult);
      console.time("Scan result");
      await reloadTickets();
      console.timeEnd("Scan result");

      const ticket = tickets.value.find(ticket => ticket.uuid === decodedText);
      if (ticket) {
        scannedTicket.value = ticket;
        console.log("Ticket found");
        if (ticket.scanned) {
          alert("El boleto ya fue escaneado!");
          backgroundColor.value = 'red';
          // after 2 seconds, reset the scanned ticket
          setTimeout(() => {
            scannedTicket.value = null;
            backgroundColor.value = 'white';
          }, 2000);
          return;
        }
        // after 2 seconds, reset the scanned ticket
        setTimeout(() => {
          scannedTicket.value = null;
          backgroundColor.value = 'white';
        }, 2000);
        backgroundColor.value = 'green';
        ticket.scanned = true;
        update(ref(db, `tickets/${ticket.key}`), {
          scanned: true,
        });


      } else {
        console.log("Ticket not found");
      }
    };

    const reloadTickets = async () => {
      console.log("Starting to get tickets");
      let rawTickets = await fetchAllTickets();
      tickets.value = Object.values(rawTickets);
      console.log(tickets.value);
    }

    onMounted(async () => {
      reloadTickets();

      const config = {
        fps: 10,
        qrbox: 250,
      };
      const html5QrcodeScanner = new Html5QrcodeScanner("qr-code-full-region", config);
      html5QrcodeScanner.render(onScanSuccess);
    });

    return {
      tickets,
      scannedTicket,
      backgroundColor,
    }
  },
}


</script>

<style></style>

<style scoped></style>

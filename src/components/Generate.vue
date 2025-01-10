<template>
  <div id="generateBody" class="column mt-10">
    <input type="text" placeholder="Nombre" v-model="name" @keyup.enter="generate" />
    <button @click="generate">Generar Boleto</button>
    <img id="qrcode" />
    <button @click="downloadQRCode" v-if="isGenerated">Descargar Boleto</button>
  </div>
</template>

<script>
import { ref as vueref } from 'vue'
import QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'
// import fs from 'fs'

import { getDatabase, ref, push, set } from "firebase/database";
import { db } from "@/assets/firebase";


export default {
  components: {
  },
  name: 'Generate',
  setup() {
    // var fs = require('fs')
    // let ticketsjson = fs.readFileSync('@/assets/tickets.json')
    // let tickets = JSON.parse(ticketsjson)

    const ticketsRef = ref(db, 'tickets')


    const name = vueref('')

    const isGenerated = vueref(false)

    const generate = async () => {
      isGenerated.value = true
      const canvas = document.createElement('canvas')
      const uuid = uuidv4()
      await QRCode.toCanvas(canvas, uuid)

      let img = document.getElementById('qrcode')
      img.src = canvas.toDataURL();

      // const img = document.createElement('img')
      // img.src = canvas.toDataURL()
      let generateBody = document.getElementById('generateBody')
      generateBody.appendChild(img)

      try {
        const newTicket = push(ticketsRef)
        console.log("newTicket:", newTicket);
        set(newTicket, {
          name: name.value,
          qr: img.src,
          uuid,
          scanned: false,
          key: newTicket.key,
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // tickets.push({
      //   name: name.value,
      //   id: uuidv4(),
      // })
      // ticketsjson = JSON.stringify(tickets)
      // fs.writeFileSync('@/assets/tickets.json', ticketsjson)
    }

    const downloadQRCode = () => {
      let img = document.getElementById('qrcode')
      const a = document.createElement('a')
      a.href = img.src
      a.download = `Boleto-${name.value}.png`
      a.click()

    }

    return {
      name,
      generate,
      isGenerated,
      downloadQRCode,
    }
  },
}


</script>

<style></style>

<style scoped>
#generateBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

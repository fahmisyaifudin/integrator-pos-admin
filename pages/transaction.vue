<template>
<div data-app>
  <div class="row">
    <div class="card">
       <div class="col-md-12">
          <div class="card-header  pb-0 p-3">
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Transaction</h6>
              </div>
            </div>
          </div>
          <div class="card-body">
              <v-data-table
                :headers="headers"
                :items="transactions"
                class="elevation-1"
                :loading="$store.state.general.isLoading"
                loading-text="Loading Please wait"
              >
               <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="() => { dialog = true; openDetail(item.id) }"
                >
                  visibility
                </v-icon>
            </template>      
              </v-data-table>
          </div>
       </div>
    </div>
  </div>
 <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Detail Transaction</span>
        </v-card-title>
        <v-card-text>
          <table style="width: 100%">
            <tr>
              <td>Cashier</td>
              <td>: {{ detail.cashier }}</td>
            </tr>
            <tr>
              <td>Customer</td>
              <td>: {{ detail.customer }}</td>
            </tr>
            <tr>
              <td>Nominal</td>
              <td>: {{ detail.nominal }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>: {{ detail.createdAt }}</td>
            </tr>
          </table>

          <table style="width: 100%" class="table table-bordered mt-4">
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Nominal</th>
            </tr>
            <tr v-for="item, index in detail.transaction_items" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ $convertToRupiah(item.price) }}</td>
              <td>{{ $convertToRupiah(item.price * item.qty) }}</td>
            </tr>
            <tr>
              <th colspan="3">Total</th>
              <th>{{  $convertToRupiah(detail.sum) }}</th>
            </tr>
          </table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="btn btn-sm" @click="dialog = false">Close</button>
          <button class="btn btn-sm btn-success" @click="dialog = false">Print</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
</div>
</template>

<script>
import moment from "moment";
export default {
    layout: 'admin',
    beforeCreate(){
      this.$store.commit('general/setMenu', 'Transaction')
      this.$axios.setToken(this.$store.state.auth.accessToken, 'Bearer')
    },
    data(){
      return {
        headers: [
          { text: 'Cashier', value: 'cashier'},
          { text: 'Customer', value: 'customer'},
          { text: 'Nominal', value: 'nominal'},
          { text: 'Time', value: 'createdAt'},
          { text: 'Action', value: 'actions'},
        ],
        transactions: [],
        dialog: false,
        detail: {
          transaction_items: [],
          sum: 0
        }
      }
    },
    created(){
      this.$axios.get('/api/transaction').then(res => {
          this.transactions = res.data.data.map(value => ({
            ...value,
            nominal: this.$convertToRupiah(value.nominal),
            createdAt: moment(value.createAt).format('MMM DD, YYYY HH:mm'),
          }))
      })
    },
    methods: {
      openDetail(id){
        this.$axios.get(`/api/transaction/${id}`).then(res => {
          this.detail = res.data.data
          this.detail.sum = res.data.data.transaction_items.reduce((a, b) => a.qty * a.price + b.qty * b.price)
        })
      }
    },
}
</script>

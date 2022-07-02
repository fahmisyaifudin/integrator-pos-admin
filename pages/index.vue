<template>
<div>
  <div class="row">
    <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
              <i class="material-icons opacity-10">weekend</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Omzet</p>
              <h4 class="mb-0">{{ $convertToRupiah(totalEarn) }}</h4>
            </div>
          </div>
          <hr class="dark horizontal my-0">
          <div class="card-footer p-3">
           
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
              <i class="material-icons opacity-10">person</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Transaction</p>
              <h4 class="mb-0">{{ totalTrx }}</h4>
            </div>
          </div>
          <hr class="dark horizontal my-0">
          <div class="card-footer p-3">
           
          </div>
        </div>
      </div>
  </div>
  <div class="row my-2">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5> Trend Sales</h5>
            </div>
            <div class="col-md-3">
                <label>Start Date</label>
                <div class="input-group input-group-outline">
                  <input type="date" class="form-control" v-model="filter.startDate" @change="() => {
                    updateChart(); updateSummary(); updateTopProduct();
                  }">
                </div>
            </div>
            <div class="col-md-3">
                <label>End Date</label>
                <div class="input-group input-group-outline">
                  <input type="date" class="form-control" v-model="filter.endDate" @change="() => {
                    updateChart(); updateSummary(); updateTopProduct();
                  }">
                </div>
            </div>
          </div>
        </div>
        <div class="card-body">
            <client-only>
              <div class="row">
                <div class="col-md-8">
                  <VueApexCharts
                    ref="areaChart"
                    height="400"
                    type="area"
                    :options="lineChartOptions"
                    :series="lineSeries"
                  ></VueApexCharts>
                </div>
                <div class="col-md-4">
                  <VueApexCharts
                    ref="barChart"
                    height="400"
                    type="bar"
                    :options="barChartOptions"
                    :series="barSeries"
                  ></VueApexCharts>
                </div>
              </div>
            </client-only>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
    layout: 'admin',
    components:{
      VueApexCharts: () => import('vue-apexcharts')
    },
    data(){
      return {
        totalEarn: 0,
        totalTrx: 0,
        filter: {
          startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD')
        },
        lineChartOptions: {
          chart: {
            id: 'vuechart-example',
            toolbar: {
              show: false
            }
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            labels: {
              formatter: (value) => { return this.$convertToRupiah(value) },
            }
          }
        },
        barChartOptions: {
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [],
          }
        },
        lineSeries: [
          {
            name: 'Total Omzet',
            data: []
          }
        ],
        barSeries:  [{
            data: []
        }],
      }
    },
    beforeCreate(){
      this.$store.commit('general/setMenu', 'Dashboard')
      this.$axios.setToken(this.$store.state.auth.accessToken, 'Bearer')
    },
    created(){
        this.updateChart()
        this.updateSummary()
        this.updateTopProduct()
       
    },
    mounted(){
      
    },
    methods: {
      updateChart(){
         this.$axios.get(`/api/dashboard/graph?start=${this.filter.startDate}&end=${this.filter.endDate}`).then(res => {
          let data = res.data.data.map(val => {
            return {
              x: val.day,
              y: val.sum
            }
          })
          
          this.$refs.areaChart.updateSeries([{
            data: data
          }])
        })
      },
      updateSummary(){
        this.$axios.get(`/api/dashboard/summary?start=${this.filter.startDate}&end=${this.filter.endDate}`).then(res => {
          this.totalEarn = res.data.data.nominal ? res.data.data.nominal : 0
          this.totalTrx = res.data.data.count
        })
      },
      updateTopProduct(){
         this.$axios.get(`/api/dashboard/top-product?start=${this.filter.startDate}&end=${this.filter.endDate}`).then(res => {
          let data = res.data.data.map(val => {
            return {
              x: val.name,
              y: val.count
            }
          })
          this.$refs.barChart.updateSeries([{
            data: data
          }])
        })
      }
    }
}
</script>

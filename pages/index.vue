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
              <p class="text-sm mb-0 text-capitalize">This Month Omzet</p>
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
              <p class="text-sm mb-0 text-capitalize">This Month Transaction</p>
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
          <h5> Trend Sales on This Month</h5>
        </div>
        <div class="card-body">
            <client-only>
              <div>
                <VueApexCharts
                  ref="demoChart"
                  height="400"
                  type="area"
                  :options="chartOptions"
                  :series="series"
                ></VueApexCharts>
              </div>
            </client-only>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
    layout: 'admin',
    components:{
      VueApexCharts: () => import('vue-apexcharts')
    },
    data(){
      return {
        totalEarn: 0,
        totalTrx: 0,
        chartOptions: {
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
        series: [
          {
            name: 'Total Omzet',
            data: []
          }
        ]
      }
    },
    beforeCreate(){
      this.$store.commit('general/setMenu', 'Dashboard')
      this.$axios.setToken(this.$store.state.auth.accessToken, 'Bearer')
    },
    created(){
        this.$axios.get('/api/dashboard/summary').then(res => {
          this.totalEarn = res.data.data.nominal
          this.totalTrx = res.data.data.count
        })

        this.$axios.get('/api/dashboard/graph').then(res => {
          let data = res.data.data.map(val => {
            return {
              x: val.day,
              y: val.sum
            }
          })
          this.$refs.demoChart.updateSeries([{
            data: data
          }])
        })
    },
    mounted(){
      
    }
}
</script>

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
              <p class="text-sm mb-0 text-capitalize">This Month Earnings</p>
              <h4 class="mb-0">{{ totalEarn }}</h4>
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
            <LineChart :chartdata="chartData" :options="chartOptions"/>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import LineChart from "@@/components/chart/LineChart";
export default {
    layout: 'admin',
    components: {
      LineChart
    },
    data(){
      return {
        totalEarn: 0,
        totalTrx: 0,
        chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                               unit: 'day'
                            },
                            distribution: 'series',
                            gridLines: {
                                display:false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display:true
                            }		
                        }]
                    }
        },
        chartData: {
              labels: [],
              datasets: [
                  {
                      label: "Total Earning",
                      fill: !1,
                      borderColor: "#03a9f4",
                      pointBorderColor: "#03a9f4",
                      pointBackgroundColor: "#FFF",
                      pointBorderWidth: 2,
                      pointHoverBorderWidth: 2,
                      pointRadius: 4,
                      data: []
                  }
              ]
          }
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
          res.data.data.forEach(element => {
           this.chartData.labels.push(element.day)
            this.chartData.datasets[0].data.push(element.sum)
          });
        })
    }
}
</script>

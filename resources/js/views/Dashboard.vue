<script setup>
import { ref, onMounted } from 'vue'
import router from '../router'
import { useUser } from '../store/user'
const user = useUser()

if(!user.is_logged) {
	router.push({name: 'Login'})
}

onMounted(async () => {

})

</script>

<template>
	<div id="dashboard">
		<div class="container mx-auto">
			
		</div>
	</div>
</template>

<!-- 



<template>
	<div id="dashboard">
		<div class="wrapper">
			<div class="dash-head">
				<h1>Hi, {{user.name}}. Welcome back!</h1>
				<p>Overall project statistics.</p>
			</div>
			<div class="grid-1 mt-20">
				<div class="card">
					<div class="p-10">
						<div class="card-title">
							<h6>Servers Online</h6>
							<select class="form-control" name="category" id="category" v-model="period">
								<option value="" disabled>Time period</option>
								<option :value="period.period" v-for="period in periods" :key="period.id">{{period.name}}</option>
							</select>
							<span class="material-icons" @click="refreshStats">sync</span>
						</div>
						<apexcharts type="area" :height="400" :options="chart_config" :series="chart_series"></apexcharts>
					</div>
				</div>
			</div>
			<div class="grid-1 mt-20">
				<div class="card card-danger">
					<div class="p-10">
						<h6>Total sales</h6>
						<div class="ammount">
							<div>653</div>
							<div>
								<span class="material-icons">arrow_circle_up</span>
								+58
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="grid-2 mt-20">
				<div class="card card-warning">
					<div class="p-10">
						<h6>Today's profit</h6>
						<div class="ammount">
							<div>$563</div>
							<div>
								<span class="material-icons">arrow_circle_up</span>
								+123
							</div>
						</div>
					</div>
				</div>
				<div class="card card-success">
					<div class="p-10">
						<h6>Total Profit</h6>
						<div class="ammount">
							<div>$10567</div>
							<div>
								<span class="material-icons">arrow_circle_up</span>
								+1597
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template> -->
<!-- <script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions} from 'vuex'
import VueApexCharts from 'vue-apexcharts'
Vue.use(Toasted)
import Api from '../helpers/api'
export default {
	name:'Dashboard',
	data: function(){
		return {
			period:1440,
			periods:[
				{
					id:0,
					name:'24 hours',
					period:1440
				},
				{
					id:1,
					name:'48 hours',
					period:2880
				},
				{
					id:2,
					name:'Last week',
					period:10080
				}
			],
			chart_series: [],
			chart_config: {
				chart: {
					id: 'basic-bar',
				},
				xaxis: {
					categories: [],
					type: "datetime",
					axisBorder: { show: false },
					axisTicks: { show: false },
					tooltip: { enabled: false },
					labels: {datetimeUTC: false}
				},
				theme: {
					mode: 'dark', 
					palette: 'palette8'
				}
			},
		}
	},
	components: {
		apexcharts: VueApexCharts,
	},
	computed: {
		...mapGetters(['is_logged','user','servers']),

	},
	mounted: async function() {
		await this.getServers()
		await this.getStats()
	},
	methods: {
		...mapActions(['getServers']),
		getStats: async function(){
			this.servers.forEach(async (server) => {
				if(server.status !== 'off'){
					let stats = []
					await Api().get(process.env.MIX_APP_API_GATE+'server-stats/'+server.id+'/'+this.period)
					.then(response => {
						stats = response.data
					})
					.catch(error => {
						console.log(error)
					})
					let chart_data = {
						name:server.name,
						data:[]
					}
					stats.forEach(stat => {
						chart_data.data.push(stat.players)
						this.chart_config.xaxis.categories.length != stats.length ? this.chart_config.xaxis.categories.push(stat.created_at) : ''
					})
					this.chart_series.push(chart_data)
				}
			})
		},
		refreshStats: function() {
			this.chart_series = []
			this.chart_config.xaxis.categories = []
			this.getStats()
		}

	}
}
</script> -->
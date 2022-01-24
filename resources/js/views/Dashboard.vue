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
						<h6>Servers Online</h6>
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
</template>
<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions} from 'vuex'
import VueApexCharts from 'vue-apexcharts'
Vue.use(Toasted)
export default {
	name:'Dashboard',
	data: function(){
		return {
			chart_series: [
				{
					name:'Eternal Vanilla',
					data: [
						26,
						35,
						44,
						53,
						22,
						45,
						35,
						65,
						78,
						25,
						37,
						55,
						75,
						86,
						25,
						35,
						45,
						55,
						74,
						12,
						22,
						35,
						44,
						36
					]
				},
				{
					name:'Eternal RPG',
					data: [
						36,
						45,
						64,
						23,
						32,
						55,
						36,
						75,
						88,
						95,
						17,
						25,
						45,
						56,
						65,
						75,
						85,
						95,
						84,
						72,
						52,
						45,
						64,
						76
					]
				},
			],
			chart_config: {
				chart: {
					id: 'basic-bar',
				},
				xaxis: {
					categories: ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
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
		...mapGetters(['is_logged','user']),

	},
	methods: {
		...mapActions([]),
	}
}
</script>
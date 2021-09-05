<template>
	<div id="dashboard">
		<div class="wrapper">
			<div class="dash-head">
				<h1>Hi, {{user.name}}. Welcome back!</h1>
				<p>Overall project statistics.</p>
			</div>
			<div class="grid-2 mt-20">
				<div class="card card-primary">
					<div class="p-10">
						<h6>Today's sales</h6>
						<div class="ammount">
							<div>15</div>
							<div>
								<span class="material-icons">arrow_circle_up</span>
								+3
							</div>
						</div>
						<D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
					</div>
				</div>
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
				<div class="card card-success">
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
				<div class="card card-warning">
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
import { D3LineChart } from 'vue-d3-charts'
Vue.use(Toasted)
export default {
	name:'Dashboard',
	data: function(){
		return {
			chart_data: [
        {hours: 238, production: 134, date: 2000},
        {hours: 938, production: 478, date: 2001},
        {hours: 1832, production: 1392, date: 2002},
        {hours: 2092, production: 2343, date: 2003},
        {hours: 2847, production: 2346, date: 2004},
        {hours: 2576, production: 2233, date: 2005},
        {hours: 2524, production: 2325, date: 2006},
        {hours: 1648, production: 2456, date: 2007},
        {hours: 2479, production: 2329, date: 2008},
        {hours: 3200, production: 2438, date: 2009}
      ],
      chart_config: {
        values: ['hours', 'production'],
        date: {
          key: 'date',
          inputFormat: '%Y',
          outputFormat: '%Y',
        },
        points:false,
        axis: {
          yTicks: 3,
        }
      },
		}
	},
	components: {
		D3LineChart,
	},
	computed: {
		...mapGetters(['is_logged','user']),

	},
	methods: {
		...mapActions([]),
	}
}
</script>
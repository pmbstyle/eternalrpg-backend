<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>RPG Distro Manager</h1>
				<p>Test and live distro.json options.</p>
			</div>
			<div class="grid-2 mt-40">
			</div>
			<div class="card">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th style="width:20%"><span>Client version</span></th>
							<th style="width:20%"><span>Java version</span></th>
							<th style="width:15%"><span>Delivery type</span></th>
							<th style="width:20%"><span>Environment</span></th>
							<th style="width:25%"><span>Actions</span></th>
						</thead>
						<tbody>
							<tr v-for="distro in distros" :key="distro.id">
								<td style="width:20%"><span>{{distro.client_version}}</span></td>
								<td style="width:20%"><span>{{distro.java_version}}</span></td>
								<td style="width:15%"><span>{{distro.delivery}}</span></td>
								<td style="width:15%"><span>{{distro.status}}</span></td>
								<td style="width:30%" class="buttons">
									<button class="btn btn-blue" @click="$router.push({name:'Distro',params:{id:distro.id}})">
										<span class="material-icons">
											edit
										</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
	name:'Distro',
	data: function(){
		return {
        }
	},
	computed: {
		...mapGetters(['is_logged','user','distros']),
	},
    mounted: async function() {
        await this.getDistros()
    },
	methods: {
		...mapActions(['getDistros'])
	}
}
</script>
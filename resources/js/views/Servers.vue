<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Server Manager</h1>
				<p>Manage server credentials and status</p>
			</div>
			<div class="card mt-40">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th style="width:25%">
								<div>
									<span>Name</span>
								</div>
							</th>
							<th style="width:25%">
								<div>
									<span>IP:Port</span>
								</div>
							</th>
							<th style="width:25%">
								<div>
									<span>System status</span>
								</div>
							</th>
							<th style="width:25%"><span>Actions</span></th>
						</thead>
						<tbody>
							<tr v-for="server in serverList" :key="server.id">
								<td style="width:25%"><span>{{server.name}}</span></td>
								<td style="width:25%"><span>{{server.ip}}:{{server.port}}</span></td>
								<td style="width:25%">
                                    <span class="material-icons color-green" v-if="server.status == 'on'">check_circle_outline</span>
                                    <span class="material-icons color-red" v-if="server.status == 'off'">highlight_off</span>
                                </td>
								<td style="width:25%" class="buttons">
									<button class="btn btn-blue" @click="$router.push({name:'ServerEdit',params:{id:server.id}})">
										<span class="material-icons">
											edit
										</span>
									</button>
									<button class="btn btn-red" @click="removeServer(server.id)">
										<span class="material-icons">
											delete
										</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
            <div class="btn-wrap sides">
                <button class="btn btn-green" @click="$router.push({name:'ServerCreate'})">Create Server</button>
            </div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions,mapMutations} from 'vuex'
Vue.use(Toasted)
export default {
	name:'Servers',
	data: function(){
		return {
			serverList:[],
        }
	},
	computed: {
		...mapGetters(['is_logged','user','servers']),
	},
    mounted: async function() {
        await this.getServers()
		await this.servers.forEach(i => {
			this.serverList.push(i)
		})
    },
	methods: {
		...mapActions(['getServers','deleteServer']),
		removeServer: async function(id) {
            await this.deleteServer(id)
            this.$toasted.show("Server deleted successfuly", { 
                position: "top-center",
                icon: 'info',
                className: 'success',
                duration : 2000
            })
			this.serverList = []
            await this.getServers()
            await this.servers.forEach(i => {
                this.serverList.push(i)
            })
        }
	}
}
</script>
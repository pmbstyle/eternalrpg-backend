<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Creating new server.</h1>
				<p>Define server credentials.</p>
			</div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Server Name</label>
                        <input type="text" v-model="serverEdit.name" class="form-control" placeholder="System server name">
                    </div>
                    <div>
                        <label>Server Status (off - no stats)</label>
                        <select class="form-control" v-model="serverEdit.status">
                            <option v-for="(opt,index) in statusOptions" :value="opt" :key="index">{{opt}}</option>
                        </select>
                    </div>
                </div>
            </div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Server IP (IPv4)</label>
                        <input type="text" v-model="serverEdit.ip" class="form-control" placeholder="Server IP">
                        </div>
                    <div>
                        <label>Server Port</label>
                        <input type="text" v-model="serverEdit.port" class="form-control" placeholder="Server Port">
                    </div>
                </div>
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-blue" @click="$router.push({name:'Servers'})">Back</button>
                <button class="btn btn-green" @click="saveServer()">Create Server</button>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
	name:'ServerCreate',
	data: function(){
		return {
            serverEdit:{
                name:'',
                status:'',
                ip:'',
                port:''
            },
            statusOptions:['on','off']
        }
	},
	computed: {
		...mapGetters(['is_logged']),
	},
	methods: {
		...mapActions(['postServer']),
        saveServer: async function(){
            let status = await this.postServer(this.serverEdit)
            if(status) {
                this.$toasted.show("Server added successfuly", { 
                    position: "top-center",
                    icon: 'info',
                    className: 'success',
                    duration : 2000
                })
                this.$router.push({name:'Servers'})
            } else {
                this.$toasted.show("Something went wrong!", { 
                    position: "top-center",
                    icon: 'info',
                    className: 'error',
                    duration : 2000
                })
            }
        }
	}
}
</script>
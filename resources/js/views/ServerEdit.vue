<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Editing {{server.name}} server.</h1>
				<p>Updating server credentials.</p>
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
                <button class="btn btn-green" @click="saveServer()">Update Server</button>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
	name:'ServerEdit',
	data: function(){
		return {
            serverEdit:{
                id:this.$route.params.id,
                name:'',
                status:'',
                ip:'',
                port:''
            },
            statusOptions:['on','off']
        }
	},
	computed: {
		...mapGetters(['is_logged','server']),
	},
    mounted: async function() {
        await this.getServer(this.$route.params.id)
        this.setServer()
    },
	methods: {
		...mapActions(['getServer','updateServer']),
        setServer:function() {
            this.serverEdit.name = this.server.name
            this.serverEdit.status = this.server.status
            this.serverEdit.ip = this.server.ip
            this.serverEdit.port = this.server.port
        },
        saveServer: async function(){
            let status = await this.updateServer(this.serverEdit)
            if(status) {
                this.$toasted.show("Server updated successfuly", { 
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
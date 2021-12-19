<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Editing {{distro.status}} distro.</h1>
				<p>Updating distro options and generating distro.json.</p>
			</div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Client version</label>
                        <input type="text" v-model="distroEdit.client_version" class="form-control" placeholder="Client version">
                    </div>
                    <div>
                        <label>Client folder</label>
                        <input type="text" v-model="distroEdit.client_folder" class="form-control" placeholder="Client folder">
                    </div>
                </div>
            </div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Java version</label>
                        <input type="text" v-model="distroEdit.java_version" class="form-control" placeholder="Java version">
                        </div>
                    <div>
                        <label>Java folder win</label>
                        <input type="text" v-model="distroEdit.java_folder_win" class="form-control" placeholder="Java folder win">
                    </div>
                </div>
            </div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Java folder mac</label>
                        <input type="text" v-model="distroEdit.java_folder_mac" class="form-control" placeholder="Java folder mac">
                    </div>
                    <div>
                        <label>Java folder lin</label>
                        <input type="text" v-model="distroEdit.java_folder_lin" class="form-control" placeholder="Java folder lin">
                    </div>
                </div>
            </div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Delivery source</label>
                        <select class="form-control" v-model="distroEdit.delivery">
                            <option v-for="(opt,index) in deliveryOptions" :value="opt" :key="index">{{opt}}</option>
                        </select>
                    </div>
                    <div></div>
                </div>
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-blue" @click="$router.push({name:'Distros'})">Back</button>
                <button class="btn btn-green" @click="saveDistro()">Update & generate</button>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
	name:'Distr',
	data: function(){
		return {
            distroEdit:{
                id:this.$route.params.id,
                client_version:'',
                client_folder:'',
                java_version:'',
                java_folder_win:'',
                java_folder_mac:'',
                java_folder_lin:'',
                delivery:'',
                status:''
            },
            deliveryOptions:['cdn','web','local']
        }
	},
	computed: {
		...mapGetters(['is_logged','user','distro']),
	},
    mounted: async function() {
        await this.getDistro(this.distroEdit.id)
        this.setDistro()
    },
	methods: {
		...mapActions(['getDistro','updateDistro']),
        setDistro:function() {
            this.distroEdit.client_version = this.distro.client_version
            this.distroEdit.client_folder = this.distro.client_folder
            this.distroEdit.java_version = this.distro.java_version
            this.distroEdit.java_folder_win = this.distro.java_folder_win
            this.distroEdit.java_folder_mac = this.distro.java_folder_mac
            this.distroEdit.java_folder_lin = this.distro.java_folder_lin
            this.distroEdit.delivery = this.distro.delivery
            this.distroEdit.status = this.distro.status
        },
        saveDistro: async function(){
            let status = await this.updateDistro(this.distroEdit)
            if(status) {
                this.$toasted.show("Distro updated successfuly", { 
                    position: "top-center",
                    icon: 'info',
                    className: 'success',
                    duration : 2000
                })
                this.$router.push({name:'Distros'})
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
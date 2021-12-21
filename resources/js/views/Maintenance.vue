<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Live RPG maintenance status.</h1>
				<p>Set maintenance status that will block client launch.</p>
			</div>
			<div class="card mt-40">
                <div class="grid-2">
                    <div>
                        <label>Maintenance status</label>
                        <select class="form-control" v-model="maintenanceEdit.status">
                            <option v-for="(opt,index) in statusOptions" :value="opt" :key="index">{{opt}}</option>
                        </select>
                    </div>
                    <div>
                        <label>Maintenance description</label>
                        <input type="text" v-model="maintenanceEdit.description" class="form-control" placeholder="Description">
                    </div>
                </div>
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-green" @click="saveMaintenance()">Update status</button>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
	name:'Maintenance',
	data: function(){
		return {
            maintenanceEdit:{
                id:0,
                status:'',
                description:''
            },
            statusOptions:['on','off']
        }
	},
	computed: {
		...mapGetters(['is_logged','user','maintenance']),
	},
    mounted: async function() {
        await this.getMaintenance()
        this.setMaintenance()
    },
	methods: {
		...mapActions(['getMaintenance','updateMaintenance']),
        setMaintenance:function() {
            this.maintenanceEdit.id = this.maintenance.id
            this.maintenanceEdit.status = this.maintenance.status
            this.maintenanceEdit.description = this.maintenance.description
        },
        saveMaintenance: async function(){
            let status = await this.updateMaintenance(this.maintenanceEdit)
            if(status) {
                this.$toasted.show("Maintenance status updated successfuly", { 
                    position: "top-center",
                    icon: 'info',
                    className: 'success',
                    duration : 2000
                })
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
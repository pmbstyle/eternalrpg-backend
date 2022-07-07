<script setup>
import { RouterView } from 'vue-router'
import appheader from '../components/appheader'
</script>

<template>
	<appheader v-if="$route.name != 'Login'" />
	<RouterView />
</template>
<template>
	<div class="-s-Card" :class="open ? '-s-Card--IsOpen' : ''">
		<div class="-s-Card__Image">
			<img src="assets/images/illustration.jpg">
		</div>
		<div class="-s-Card__Headline">
			<span>{{ headline }}</span>
		</div>
		<p class="-s-Card__Text">
			{{ text }}
		</p>
	</div>
</template>

<style scoped>
	.-s-Card { display: none; flex-direction: column; font-family: "Roboto", sans-serif; }
	.-s-Card--IsOpen { display: flex; }
	.-s-Card__Image { height: 200px; }
	.-s-Card__Headline { font-size: 1.5rem; font-weight: bold; }
	.-s-Card__Text { font-size: 1.2rem; }
</style>

<script>
module.exports = {
	data: function() {
		return {
			headline: "Hello world !",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			open: true
		}
	}
}
</script>
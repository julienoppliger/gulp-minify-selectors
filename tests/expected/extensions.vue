<template>
	<div class="a" :class="open ? 'e' : ''">
		<div class="b">
			<img src="assets/images/illustration.jpg">
		</div>
		<div class="c">
			<span>{{ headline }}</span>
		</div>
		<p class="d">
			{{ text }}
		</p>
	</div>
</template>

<style scoped>
	.a { display: none; flex-direction: column; font-family: "Roboto", sans-serif; }
	.e { display: flex; }
	.b { height: 200px; }
	.c { font-size: 1.5rem; font-weight: bold; }
	.d { font-size: 1.2rem; }
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
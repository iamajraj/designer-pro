<script lang="ts">
	import { type Snippet } from 'svelte';
	import '../app.css';
	import type { SessionUser } from '$lib/types';

	type Props = {
		data: {
			user: SessionUser;
		};
		children: Snippet;
	};

	let { children, data }: Props = $props();
</script>

{@render children()}

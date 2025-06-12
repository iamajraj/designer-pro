<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { SessionUser } from '$lib/types';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { writable } from 'svelte/store';

	type Props = {
		data: {
			user: SessionUser;
		};
		children: Snippet;
	};

	let { children, data }: Props = $props();

	const user = writable(data.user);
	setContext('user', user);
</script>

<div class="w-full min-h-screen flex gap-10 p-5 bg-[#F7F7F7]">
	<Sidebar />
	{@render children()}
</div>

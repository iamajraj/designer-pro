<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { SessionUser } from '$lib/types';
	import Sidebar from '$lib/components/Sidebar.svelte';

	type Props = {
		data: {
			user: SessionUser;
		};
		children: Snippet;
	};

	let { children, data }: Props = $props();
</script>

<div class="w-full min-h-screen flex gap-10 p-5 bg-[#F7F7F7]">
	<Sidebar />
	{@render children()}
</div>

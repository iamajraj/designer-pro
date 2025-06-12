<script lang="ts">
	import {
		Home,
		ChevronUp,
		FileText,
		FolderClock,
		Archive,
		CreditCard,
		Star,
		MessageSquare,
		LogOut,
		ChevronLeft,
		ChevronRight,
		Palette,
		BookText,
		Bookmark,
		User
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let isCollapsed = $state(false);
	let activePath = $derived(page.url.pathname);
	let isCreationOpen = $derived(activePath.split('/')[1] === 'creation');
	let isProfile = $derived(activePath === '/profile');

	const navItems = [
		{ path: '/', label: 'Home', icon: Home },
		{
			path: '/creation',
			label: 'Criação',
			icon: Palette,
			isCollapsible: true,
			children: [
				{ path: '/creation/requests', label: 'Solicitações', icon: FileText },
				{ path: '/creation/in-progress', label: 'Em andamento', icon: FolderClock }
			]
		},
		{ path: '/file', label: 'Arquivo', icon: Archive },
		{ path: '/credits', label: 'Créditos', icon: CreditCard },
		{ path: '/brands', label: 'Marcas', icon: Bookmark }
	];

	const supportItems = [
		{ path: '/start-here', label: 'Inicie aqui', icon: Star },
		{ path: '/contact-us', label: 'Fale conosco', icon: MessageSquare },
		{ path: '/terms', label: 'Termos da plataforma', icon: BookText }
	];
</script>

<aside
	class="relative flex h-[calc(100vh-40px)] flex-col gap-4 bg-white rounded-[20px] border-slate-200 transition-all duration-300 ease-in-out custom-shadow"
	class:w-64={!isCollapsed}
	class:w-20={isCollapsed}
>
	<button
		onclick={() => (isCollapsed = !isCollapsed)}
		class="absolute top-1/2 -right-3 z-10 h-6 w-6 rounded-full bg-white border-2 border-slate-300 text-slate-500 hover:border-pink-500 hover:text-pink-500 flex items-center justify-center transition-all"
		aria-label="Toggle sidebar"
	>
		{#if isCollapsed}
			<ChevronRight class="h-4 w-4" />
		{:else}
			<ChevronLeft class="h-4 w-4" />
		{/if}
	</button>

	<div
		class="flex h-16 items-center justify-center border-b border-slate-200 flex-shrink-0"
		class:pl-5={!isCollapsed}
	>
		<div
			class="flex items-center transition-all duration-300"
			class:w-64={!isCollapsed}
			class:w-20={isCollapsed}
			class:justify-center={isCollapsed}
		>
			{#if !isCollapsed}
				<span class="text-xl font-bold tracking-tighter text-slate-800 whitespace-nowrap">
					Designer<span class="text-pink-500">PRO</span>
				</span>
			{:else}
				<span class="text-2xl font-bold text-pink-500">D</span>
			{/if}
		</div>
	</div>

	<div class="flex-1 overflow-y-auto overflow-x-hidden">
		<nav class="flex flex-col gap-2 p-2" class:px-4={!isCollapsed} class:px-3={isCollapsed}>
			{#each navItems as item (item.path)}
				{@const isLinkActive = activePath === item.path}
				{@const isGroupOpen = item.isCollapsible && isCreationOpen}
				{@const isStyled = isLinkActive || isGroupOpen}

				<a
					href={item.path}
					onclick={(e) => {
						e.preventDefault();
						if (item.isCollapsible) {
							isCreationOpen = !isCreationOpen;
						}
						activePath = item.path;
						goto(item.path);
					}}
					class="flex items-center rounded-lg gap-3 py-3 transition-all duration-200 {isStyled
						? 'shadow-pink-500/20'
						: ''}"
					class:px-3={!isCollapsed}
					class:py-2={!isCollapsed}
					class:justify-start={!isCollapsed}
					class:p-3={isCollapsed}
					class:justify-center={isCollapsed}
					class:mt-2={item.path === '/creditos'}
					class:bg-pink-500={isStyled}
					class:text-white={isStyled}
					class:shadow-lg={isStyled}
					class:hover:bg-pink-600={isStyled}
					class:text-slate-600={!isStyled}
					class:hover:bg-slate-100={!isStyled}
				>
					<item.icon class="h-5 w-5 flex-shrink-0" />
					{#if !isCollapsed}
						<span class="text-sm font-medium flex-1 whitespace-nowrap">{item.label}</span>
						{#if item.isCollapsible}
							<ChevronUp
								class="h-4 w-4 transition-transform duration-300 {!isCreationOpen
									? 'rotate-180'
									: ''}"
							/>
						{/if}
					{/if}
				</a>

				{#if !isCollapsed && item.children && isCreationOpen}
					<ul class="space-y-1 mt-1 ml-4" transition:slide={{ duration: 250, easing: quintOut }}>
						{#each item.children as child}
							<li>
								<a
									href={child.path}
									onclick={(e) => {
										e.preventDefault();
										activePath = child.path;
										goto(child.path);
									}}
									class="flex w-full items-center rounded-md gap-3 py-2 px-3 text-sm font-medium transition-colors"
									class:text-pink-500={activePath === child.path}
									class:font-semibold={activePath === child.path}
									class:text-slate-500={activePath !== child.path}
									class:hover:text-slate-900={activePath !== child.path}
								>
									<item.icon class="h-4 w-4 flex-shrink-0 ml-2" />
									<span>{child.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</nav>
	</div>

	<div class="p-2 flex-shrink-0" class:px-4={!isCollapsed} class:px-3={isCollapsed}>
		{#if !isCollapsed}
			<h3 class="px-3 pt-2 pb-2 text-xs font-semibold text-slate-400 tracking-wider">Suporte</h3>
		{/if}
		{#each supportItems as item}
			{@const isStyled = item.path === activePath}
			<a
				href={item.path}
				class="flex items-center rounded-md gap-3 py-3 transition-colors text-slate-600 hover:bg-slate-100"
				class:px-3={!isCollapsed}
				class:py-2={!isCollapsed}
				class:justify-start={!isCollapsed}
				class:p-3={isCollapsed}
				class:justify-center={isCollapsed}
				class:bg-pink-500={isStyled}
				class:text-white={isStyled}
				class:shadow-lg={isStyled}
				class:hover:bg-pink-600={isStyled}
				class:text-slate-600={!isStyled}
				class:hover:bg-slate-100={!isStyled}
			>
				<item.icon class="h-5 w-5 flex-shrink-0" />
				{#if !isCollapsed}
					<span class="text-sm font-medium whitespace-nowrap">{item.label}</span>
				{/if}
			</a>
		{/each}
	</div>

	<div
		class="p-2 border-t border-slate-200 flex-shrink-0"
		class:p-4={!isCollapsed}
		class:px-3={isCollapsed}
	>
		<a
			href="/profile"
			class="flex items-center w-full gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors"
			class:bg-pink-500={isProfile}
			class:shadow-lg={isProfile}
			class:hover:bg-pink-600={isProfile}
			class:text-slate-600={!isProfile}
			class:hover:bg-slate-100={!isProfile}
		>
			{#if isCollapsed}
				<User class="h-6 w-6 mx-auto {isProfile ? 'text-white' : 'text-slate-600'}" />
			{:else}
				<User class="h-8 w-8 {isProfile ? 'text-white' : 'text-slate-500'}" />
				<div class="flex-1 overflow-hidden">
					<p class="text-sm font-semibold {isProfile ? 'text-white' : 'text-slate-700'} truncate">
						Leonardo
					</p>
					<p class="text-xs {isProfile ? 'text-white' : 'text-slate-500'} truncate">
						leocpizarro@gmail.com
					</p>
				</div>
			{/if}
		</a>
		<form method="post" action="/?/logout">
			<button
				type="submit"
				class="w-full flex items-center rounded-md gap-3 transition-colors text-slate-600 hover:bg-slate-100 mt-1"
				class:px-3={!isCollapsed}
				class:py-2={!isCollapsed}
				class:justify-start={!isCollapsed}
				class:p-3={isCollapsed}
				class:justify-center={isCollapsed}
			>
				<LogOut class="h-5 w-5 flex-shrink-0" />
				{#if !isCollapsed}
					<span class="text-sm font-medium whitespace-nowrap">Sair</span>
				{/if}
			</button>
		</form>
	</div>
</aside>

<style>
	.custom-shadow {
		box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
	}
</style>

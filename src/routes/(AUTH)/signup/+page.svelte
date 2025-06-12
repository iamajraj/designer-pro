<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { User, Lock, Users, Mail } from 'lucide-svelte';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Create an Account - DesignerPRO</title>
</svelte:head>

<div class="relative min-h-screen w-full overflow-hidden bg-slate-50">
	<div
		class="absolute top-0 -left-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"
	></div>
	<div
		class="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"
	></div>
	<div
		class="absolute -bottom-8 left-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"
	></div>

	<div class="relative min-h-screen flex flex-col items-center justify-center py-12 px-4">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold tracking-tighter text-slate-800">
				Designer<span class="text-pink-500">PRO</span>
			</h1>
			<h2 class="mt-2 text-2xl font-semibold text-slate-700">Start Your Creative Journey</h2>
			<p class="mt-2 text-sm text-slate-500">
				Already have an account?
				<a href="/login" class="font-medium text-pink-500 hover:text-pink-600 transition-colors">
					Sign In
				</a>
			</p>
		</div>

		<div
			class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50"
		>
			<div class="p-8 sm:p-10">
				<form class="space-y-6" method="POST" action="?/register" use:enhance>
					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
							<User class="h-5 w-5 text-slate-400" />
						</span>
						<input
							id="username"
							name="username"
							type="text"
							placeholder="Username"
							required
							class="block w-full pl-12 pr-3 py-2.5 bg-white/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
						/>
					</div>

					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
							<Mail class="h-5 w-5 text-slate-400" />
						</span>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							required
							class="block w-full pl-12 pr-3 py-2.5 bg-white/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
						/>
					</div>

					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
							<Lock class="h-5 w-5 text-slate-400" />
						</span>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							required
							class="block w-full pl-12 pr-3 py-2.5 bg-white/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
						/>
					</div>

					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
							<Users class="h-5 w-5 text-slate-400" />
						</span>
						<select
							id="user_type"
							name="user_type"
							class="block w-full pl-12 pr-3 py-2.5 bg-white/50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
						>
							<option class="bg-white" value="user">I'm a User</option>
							<option class="bg-white" value="artist">I'm an Artist</option>
						</select>
					</div>

					<p class="text-sm text-red-500">{form?.message ?? ''}</p>

					<div>
						<button
							type="submit"
							class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-pink-500/20 text-md font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-xl hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:-translate-y-0.5 transition-all duration-300"
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	/* Simple animation for the background blobs */
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}
	.animate-blob {
		animation: blob 7s infinite;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>

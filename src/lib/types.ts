import type { Writable } from 'svelte/store';
import type { SessionValidationResult } from './server/auth';

export type SessionUser = SessionValidationResult['user'];
export type ContextUser = Writable<SessionUser>;

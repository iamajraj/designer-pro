import { pgTable, serial, text, integer, timestamp, boolean, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tables
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const request = pgTable('request', {
	id: serial('id').primaryKey(),
	userId: text('user_id').references(() => user.id),
	status: text('status').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const art = pgTable('art', {
	id: serial('id').primaryKey(),
	requestId: integer('request_id').references(() => request.id),
	title: text('title').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const file = pgTable('file', {
	id: serial('id').primaryKey(),
	artId: integer('art_id').references(() => art.id),
	url: text('url').notNull(),
	type: text('type').notNull(),
	name: text('name'),
	isFinal: boolean('is_final').default(false),
	uploadedAt: timestamp('uploaded_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const revision = pgTable('revision', {
	id: serial('id').primaryKey(),
	artId: integer('art_id').references(() => art.id),
	requestId: integer('request_id').references(() => request.id),
	description: text('description'),
	status: text('status').default('open'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const annotation = pgTable('annotation', {
	id: serial('id').primaryKey(),
	revisionId: integer('revision_id').references(() => revision.id),
	fileId: integer('file_id').references(() => file.id),
	data: json('data').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const completionDelivery = pgTable('completion_delivery', {
	id: serial('id').primaryKey(),
	requestId: integer('request_id').references(() => request.id),
	message: text('message'),
	deliveredAt: timestamp('delivered_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const deliveryEstimate = pgTable('delivery_estimate', {
	id: serial('id').primaryKey(),
	revisionId: integer('revision_id').references(() => revision.id),
	deliveryDate: timestamp('delivery_date', { withTimezone: true, mode: 'date' }).notNull()
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	requests: many(request)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const requestRelations = relations(request, ({ one, many }) => ({
	user: one(user, {
		fields: [request.userId],
		references: [user.id]
	}),
	arts: many(art),
	revisions: many(revision),
	completionDelivery: many(completionDelivery)
}));

export const artRelations = relations(art, ({ one, many }) => ({
	request: one(request, {
		fields: [art.requestId],
		references: [request.id]
	}),
	files: many(file),
	revisions: many(revision)
}));

export const fileRelations = relations(file, ({ one, many }) => ({
	art: one(art, {
		fields: [file.artId],
		references: [art.id]
	}),
	annotations: many(annotation)
}));

export const revisionRelations = relations(revision, ({ one, many }) => ({
	request: one(request, {
		fields: [revision.requestId],
		references: [request.id]
	}),
	art: one(art, {
		fields: [revision.artId],
		references: [art.id]
	}),
	annotations: many(annotation),
	deliveryEstimate: many(deliveryEstimate)
}));

export const annotationRelations = relations(annotation, ({ one }) => ({
	revision: one(revision, {
		fields: [annotation.revisionId],
		references: [revision.id]
	}),
	file: one(file, {
		fields: [annotation.fileId],
		references: [file.id]
	})
}));

export const completionDeliveryRelations = relations(completionDelivery, ({ one }) => ({
	request: one(request, {
		fields: [completionDelivery.requestId],
		references: [request.id]
	})
}));

export const deliveryEstimateRelations = relations(deliveryEstimate, ({ one }) => ({
	revision: one(revision, {
		fields: [deliveryEstimate.revisionId],
		references: [revision.id]
	})
}));

// Inferred Types
export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Request = typeof request.$inferSelect;
export type Art = typeof art.$inferSelect;
export type File = typeof file.$inferSelect;
export type Revision = typeof revision.$inferSelect;
export type Annotation = typeof annotation.$inferSelect;
export type CompletionDelivery = typeof completionDelivery.$inferSelect;
export type DeliveryEstimate = typeof deliveryEstimate.$inferSelect;

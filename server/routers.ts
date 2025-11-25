import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";

function randomSuffix() {
  return Math.random().toString(36).substring(2, 15);
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    // Upload file metadata after client uploads to S3
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        fileUrl: z.string(),
        fileKey: z.string(),
        fileName: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
        fileType: z.enum(["image", "video", "document"]),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createFile({
          userId: ctx.user.id,
          title: input.title,
          description: input.description || null,
          fileUrl: input.fileUrl,
          fileKey: input.fileKey,
          fileName: input.fileName,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          fileType: input.fileType,
          category: input.category || null,
        });
        
        return { success: true };
      }),

    // Get presigned URL for upload
    getUploadUrl: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const fileKey = `${ctx.user.id}/files/${input.fileName}-${randomSuffix()}`;
        // Return the key for client to upload
        return { fileKey };
      }),

    // Upload file directly (for smaller files)
    uploadDirect: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // base64
        mimeType: z.string(),
        title: z.string(),
        description: z.string().optional(),
        fileType: z.enum(["image", "video", "document"]),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const buffer = Buffer.from(input.fileData, 'base64');
        const fileKey = `${ctx.user.id}/files/${input.fileName}-${randomSuffix()}`;
        
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        await db.createFile({
          userId: ctx.user.id,
          title: input.title,
          description: input.description || null,
          fileUrl: url,
          fileKey: fileKey,
          fileName: input.fileName,
          fileSize: buffer.length,
          mimeType: input.mimeType,
          fileType: input.fileType,
          category: input.category || null,
        });
        
        return { success: true, url };
      }),

    // List all files
    list: publicProcedure
      .input(z.object({
        type: z.enum(["image", "video", "document", "all"]).optional(),
      }).optional())
      .query(async ({ input }) => {
        if (!input?.type || input.type === "all") {
          return await db.getAllFiles();
        }
        return await db.getFilesByType(input.type);
      }),

    // Get single file
    get: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        const file = await db.getFileById(input.id);
        if (file) {
          await db.incrementFileViews(input.id);
        }
        return file;
      }),

    // Get user's files
    myFiles: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserFiles(ctx.user.id);
      }),

    // Delete file
    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.deleteFile(input.id, ctx.user.id);
        return { success: true };
      }),

    // Toggle like
    toggleLike: protectedProcedure
      .input(z.object({
        fileId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.toggleFileLike(input.fileId, ctx.user.id);
      }),

    // Check if user liked
    checkLiked: protectedProcedure
      .input(z.object({
        fileId: z.number(),
      }))
      .query(async ({ input, ctx }) => {
        return await db.checkUserLiked(input.fileId, ctx.user.id);
      }),
  }),

  comments: router({
    // Create comment
    create: protectedProcedure
      .input(z.object({
        fileId: z.number(),
        content: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createComment({
          fileId: input.fileId,
          userId: ctx.user.id,
          content: input.content,
        });
        return { success: true };
      }),

    // Get file comments
    list: publicProcedure
      .input(z.object({
        fileId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getFileComments(input.fileId);
      }),
  }),
});

export type AppRouter = typeof appRouter;

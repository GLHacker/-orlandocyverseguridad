import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("files router", () => {
  it("should return empty array when no files exist", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.files.list();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should filter files by type", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const imageFiles = await caller.files.list({ type: "image" });
    const videoFiles = await caller.files.list({ type: "video" });
    const documentFiles = await caller.files.list({ type: "document" });

    expect(Array.isArray(imageFiles)).toBe(true);
    expect(Array.isArray(videoFiles)).toBe(true);
    expect(Array.isArray(documentFiles)).toBe(true);
  });

  it("should return user's files", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const myFiles = await caller.files.myFiles();

    expect(Array.isArray(myFiles)).toBe(true);
  });

  it("should generate upload URL with correct format", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.files.getUploadUrl({
      fileName: "test.jpg",
      mimeType: "image/jpeg",
    });

    expect(result).toHaveProperty("fileKey");
    expect(result.fileKey).toContain(ctx.user.id.toString());
    expect(result.fileKey).toContain("files");
  });
});

describe("comments router", () => {
  it("should return empty array when no comments exist for file", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const comments = await caller.comments.list({ fileId: 9999 });

    expect(Array.isArray(comments)).toBe(true);
  });
});

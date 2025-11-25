import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, files, comments, fileLikes, InsertFile, InsertComment, InsertFileLike } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// File operations
export async function createFile(file: InsertFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(files).values(file);
  return result;
}

export async function getAllFiles() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      file: files,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      }
    })
    .from(files)
    .leftJoin(users, eq(files.userId, users.id))
    .orderBy(desc(files.createdAt));
  
  return result;
}

export async function getFilesByType(fileType: "image" | "video" | "document") {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      file: files,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      }
    })
    .from(files)
    .leftJoin(users, eq(files.userId, users.id))
    .where(eq(files.fileType, fileType))
    .orderBy(desc(files.createdAt));
  
  return result;
}

export async function getFileById(fileId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select({
      file: files,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      }
    })
    .from(files)
    .leftJoin(users, eq(files.userId, users.id))
    .where(eq(files.id, fileId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getUserFiles(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(files)
    .where(eq(files.userId, userId))
    .orderBy(desc(files.createdAt));
  
  return result;
}

export async function incrementFileViews(fileId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(files)
    .set({ views: sql`${files.views} + 1` })
    .where(eq(files.id, fileId));
}

export async function deleteFile(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .delete(files)
    .where(and(eq(files.id, fileId), eq(files.userId, userId)));
  
  return result;
}

// Comment operations
export async function createComment(comment: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(comments).values(comment);
  return result;
}

export async function getFileComments(fileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      comment: comments,
      user: {
        id: users.id,
        name: users.name,
      }
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.fileId, fileId))
    .orderBy(desc(comments.createdAt));
  
  return result;
}

// Like operations
export async function toggleFileLike(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if like exists
  const existingLike = await db
    .select()
    .from(fileLikes)
    .where(and(eq(fileLikes.fileId, fileId), eq(fileLikes.userId, userId)))
    .limit(1);
  
  if (existingLike.length > 0) {
    // Unlike
    await db
      .delete(fileLikes)
      .where(and(eq(fileLikes.fileId, fileId), eq(fileLikes.userId, userId)));
    
    await db
      .update(files)
      .set({ likes: sql`${files.likes} - 1` })
      .where(eq(files.id, fileId));
    
    return { liked: false };
  } else {
    // Like
    await db.insert(fileLikes).values({ fileId, userId });
    
    await db
      .update(files)
      .set({ likes: sql`${files.likes} + 1` })
      .where(eq(files.id, fileId));
    
    return { liked: true };
  }
}

export async function checkUserLiked(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const result = await db
    .select()
    .from(fileLikes)
    .where(and(eq(fileLikes.fileId, fileId), eq(fileLikes.userId, userId)))
    .limit(1);
  
  return result.length > 0;
}

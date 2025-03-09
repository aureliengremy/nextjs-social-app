"use server"

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.action"
import prisma from "@/lib/prisma";

export async function createPost(content: string, imageUrl: string) {
    try {
        const userId = await getDbUserId();

        const post = await prisma.post.create({
            data: {
                content,
                // image,
                authorId: userId
            }
        })

        revalidatePath("/"); // Purge the cache for the home page
        return { success: true, post }

    } catch (error) {
        console.error("failed to create post:", error);
        return { success: false, error: "Failed to create post" };
    }

}
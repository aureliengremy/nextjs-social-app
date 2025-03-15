"use server"

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.action"
import prisma from "@/lib/prisma";

export async function createPost(content: string, imageUrl: string) {
    try {
        const userId = await getDbUserId();

        if (!userId) return {};

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

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                                name: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "asc",
                    }
                },
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    }
                }
            }
        })
        return posts
    } catch (error) {
        console.log("Error fetching Posts");
        throw new Error("Failed to fetch posts");
    }
}
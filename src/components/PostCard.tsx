"use client";

import { getPosts } from '@/actions/post.action';
import { useUser } from '@clerk/nextjs';
// import { Post } from '@prisma/client';
import React, { useState } from 'react'

// type Posts = ReturnType<typeof getPosts> // but returning a promesse
type Posts = Awaited<ReturnType<typeof getPosts>> // hover Posts to see what you get
type Post = Posts[number]

function PostCard({ post, dbUserId }: { post: Post; dbUserId: string | null }) {

    const { user } = useUser();
    const [newComment, setNewComment] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [optimistLikes, setOptimistLikes] = useState(post._count.likes)


    return (
        <div>PostCard</div>
    )
}

export default PostCard
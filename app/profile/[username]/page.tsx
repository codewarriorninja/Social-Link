import { Metadata } from "next";
import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
  } from "@/actions/profileAction";
  import { notFound } from "next/navigation";
  import ProfilePageClient from "./ProfilePageClient";

  export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata | undefined> {
    const { username } = await params;
    const user = await getProfileByUsername(username);
    if (!user) return;
  
    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile.`,
    };
  }
  
  async function ProfilePageServer({ params }: { params: Promise<{ username: string }> }) {
    const {username} = await params;
    const user = await getProfileByUsername(username);
  
    if (!user) notFound();
  
    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
      getUserPosts(user.id),
      getUserLikedPosts(user.id),
      isFollowing(user.id),
    ]);
  
    return (
      <ProfilePageClient
        user={user}
        posts={posts}
        likedPosts={likedPosts}
        isFollowing={isCurrentUserFollowing}
      />
    );
  }
  export default ProfilePageServer;

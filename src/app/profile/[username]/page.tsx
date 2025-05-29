import { getProfileByUsername } from "@/actions/profile.actions"


export async function generateMetadata({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername(params.username)
    if (!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio ?? `No description for ${user.username}`,
    }
}



async function ProfilePage({ params }: { params: { username: string } }) {
    // console.log("Params: ", params)

    // Try error component :
    // throw new Error()

    //Try the loading component :
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage
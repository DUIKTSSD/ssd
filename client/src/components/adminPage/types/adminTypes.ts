export interface ModeratorContentBase {
    type: "projects" | "news" | "gallery" | "memes",
    id: number,
}

export interface ProjectsData extends ModeratorContentBase {
    type: "projects",
    title: string,
    mainText: string,
    technologyStack: string,
    wishes: string,
    status: boolean,
    phoneNumber: string,
    telegramProfile: string,
    team: [],
    leader: {
        id: number,
        username: string,
        email: string
    },
    isLegal: boolean | null
}

export interface NewsData extends ModeratorContentBase {
    type: "news",
    text: string,
    image: string,
    title: string
    createdAt: string
}

export interface MemesData extends ModeratorContentBase {
    type: "memes",
    image: string,
    author: {
        id: number,
        username: string,
        email: string
    },
    isLegal: boolean | null,
    createdAt: string
}

export interface GalleryData extends ModeratorContentBase {
    type: "gallery",
    image: string,
    owner: string
}
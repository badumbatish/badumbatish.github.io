export enum MediaType {
    Manga = "manga",
    Movie = "movie",
    Video = "video",
    Writing = "writing",
}

export const MediaTypeLabel: Record<MediaType, string> = {
    [MediaType.Manga]: "Manga",
    [MediaType.Movie]: "Movie",
    [MediaType.Video]: "Video",
    [MediaType.Writing]: "Writing",
};

export interface MediaPost {
    slug: string;
    title: string;
    tags: string[];
    type: MediaType;
    text: string;
    date: string;
    author: string;
    imageUrl: string;
}

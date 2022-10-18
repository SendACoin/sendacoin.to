export const formatImageUrl = (imageUrl, defaultPicture = null) => {

    if (!imageUrl) return defaultPicture;

    if (imageUrl.startsWith("ipfs://")) {
        console.log(`https://w3s.link/ipfs/${imageUrl.replace("ipfs://", "")}`)
        return `https://w3s.link/ipfs/${imageUrl.replace("ipfs://", "")}`
    }
    console.log(imageUrl)

    return imageUrl;

}

export const formatUrl = (url) => {

    if (!url) return null;

    if (url.startsWith("https://")) {
        return url
    }

    return `https://${url}`;

}

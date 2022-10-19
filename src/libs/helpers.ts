export const formatImageUrl = (imageUrl, defaultPicture = null) => {

    if (!imageUrl) return defaultPicture;

    if (imageUrl.startsWith("ipfs://")) {
        return `https://w3s.link/ipfs/${imageUrl.replace("ipfs://", "")}`
    }

    return imageUrl;

}

export const formatUrl = (url) => {

    if (!url) return null;

    if (url.startsWith("https://")) {
        return url
    }

    return `https://${url}`;

}


export const isEmpty = (n: any) => {
    if (n == null) return true;

    return !(!!n
        ? typeof n === 'object'
            ? Array.isArray(n)
                ? !!n.length
                : !!Object.keys(n).length
            : true
        : false);
};

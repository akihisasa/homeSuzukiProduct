// Cloudinary configuration
const CLOUDINARY = {
    baseUrl: 'https://res.cloudinary.com/dgldatt9k/image/upload',
    defaultTransforms: 'f_auto,q_auto',
    defaultPlaceholder: 'v1740269875/foods_vwrriz.webp',
    sizes: {
        small: {
            width: 400,
            height: 300
        },
        medium: {
            width: 800,
            height: 600
        }
    }
};

// Generate Cloudinary URL with transforms
function getCloudinaryUrl(imageId, transforms = '') {
    return `${CLOUDINARY.baseUrl}/${transforms}/${imageId}`;
}

// Generate responsive image srcset
function getResponsiveSrcSet(imageId) {
    const { small, medium } = CLOUDINARY.sizes;
    return [
        `${getCloudinaryUrl(imageId, `w_${small.width},h_${small.height},c_fill,${CLOUDINARY.defaultTransforms}`)} ${small.width}w`,
        `${getCloudinaryUrl(imageId, `w_${medium.width},h_${medium.height},c_fill,${CLOUDINARY.defaultTransforms}`)} ${medium.width}w`
    ].join(',\n');
}

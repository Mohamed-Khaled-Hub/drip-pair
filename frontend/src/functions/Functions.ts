export function getFromAssets(src: string) {
    // Remember to change path before deployment
    const paths = {
        deploymentPath: '',
        localhostPath: '../../public/assets/',
    }

    return new URL(paths.deploymentPath + src, import.meta.url).href
}

export function changeTitle(title: string) {
    document.title = `${title} - DRIP PAIR`
}

export function shoeImageNameFormatter(shoeName: string, color: string) {
    return shoeName.split(' ').join('_') + '_' + color.split(' / ').join('_')
}

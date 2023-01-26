import {useEffect, FC, useRef, memo, CSSProperties, useState} from 'react'
import './style.scss'

interface LazyImageProps {
    url: string
    alt: string
    style?: CSSProperties
}

const LazyImage: FC<LazyImageProps> = memo(({url, alt, style}) => {
    const ref = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (!ref.current) return

        function onEntry(entry: IntersectionObserverEntryInit[]) {
            const element = entry[0]
            if (element.isIntersecting) {
                const image = element.target as HTMLImageElement
                image.classList.add('element-show')
                image.src = image.getAttribute('data-src') as string
            }
        }

        let options = { threshold: [0.5] }
        let observer = new IntersectionObserver(onEntry, options)
        observer.observe(ref.current as HTMLImageElement)
    }, [ref.current])

    return <img ref={ref} src="" data-src={url} alt={alt} style={style} className="lazy-image"/>
})

export default LazyImage
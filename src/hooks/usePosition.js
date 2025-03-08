import { useSearchParams } from 'react-router-dom'

export function usePosition() {
    const [searchPram] = useSearchParams()
    const lat = searchPram.get('lat')
    const lng = searchPram.get('lng')

    return [lat, lng]
}
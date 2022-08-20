import shuffle from 'lodash/shuffle'
import type { GetStaticProps, NextPage } from 'next'
import { VideoService } from 'services/video.service'

import Home from '@/components/pages/home/Home'
import { IHome } from '@/components/pages/home/home.interface'

import { IVideo } from '@/types/video.interface'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAll()
		const { data: topVideos } = await VideoService.getMostPopular()

		return {
			props: {
				newVideos,
				randomVideo:
					shuffle(newVideos.filter(v => v.id !== topVideos[0].id))[0] ||
					({} as IVideo),
				topVideo: topVideos[0]
			} as IHome
		}
	} catch (e) {
		return {
			props: {
				newVideos: [],
				randomVideo: {} as IVideo,
				topVideo: {} as IVideo
			} as IHome
		}
	}
}
export default HomePage

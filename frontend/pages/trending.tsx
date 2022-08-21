import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { VideoService } from 'services/video.service'

import Trending from '@/components/pages/trending/Trending'

import { IVideo } from '@/types/video.interface'

interface ITrendingPage {
	topVideos: IVideo[]
}

const TrendingPage: NextPage<ITrendingPage> = ({ topVideos }) => {
	return <Trending topVideos={topVideos} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: topVideos } = await VideoService.getMostPopular()
		return {
			props: {
				topVideos
			},
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				topVideos: []
			}
		}
	}
}

export default TrendingPage

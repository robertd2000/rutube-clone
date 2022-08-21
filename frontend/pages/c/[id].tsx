import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { UserService } from 'services/user.service'
import { VideoService } from 'services/video.service'

import Channel from '@/components/pages/channel/Channel'
import { IChannel } from '@/components/pages/channel/channel.interface'

import { IUser } from '@/types/user.interface'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
	return <Channel channel={channel} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: users } = await UserService.getAll()

		const paths = users.map(user => ({
			params: {
				id: String(user.id)
			}
		}))
		return {
			paths,
			fallback: 'blocking'
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: channel } = await UserService.getUser(+params?.id!)

		return {
			props: {
				channel
			} as IChannel
		}
	} catch (e) {
		return {
			props: {
				channel: {} as IUser
			} as IChannel
		}
	}
}

export default ChannelPage

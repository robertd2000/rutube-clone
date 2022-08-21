import React, { FC } from 'react'

import Layout from '@/components/layout/Layout'
import ChannelInfoSmall from '@/components/ui/channel-indo-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'

import Catalog from '../home/catalog/Catalog'

import styles from './Channel.module.scss'
import { IChannel } from './channel.interface'

const Channel: FC<IChannel> = ({ channel }) => {
	return (
		<Layout title={channel.name}>
			<div className={styles.channel}>
				<div className={styles.info}>
					<ChannelInfoSmall channel={channel} />
					<SubscribeButton channelIdForSubscribe={channel.id} />
				</div>
				<article className={styles.article}>{channel.description}</article>
			</div>
			<Catalog newVideos={channel.videos || []} />
		</Layout>
	)
}

export default Channel

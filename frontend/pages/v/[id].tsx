import React from 'react'

import Video from '@/components/pages/video/Video'

import { NextPageAuth } from '@/providers/private-route.interface'

const VideoPage: NextPageAuth = props => {
	return <Video {...props} />
}

export default VideoPage

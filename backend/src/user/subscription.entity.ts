import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { VideoEntity } from 'src/video/video.entity'
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity('Subscription')
export class SubscriptionEntity extends Base {
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'to_channel_id' })
	toChannel: UserEntity
}

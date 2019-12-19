class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :followed_user_id
end

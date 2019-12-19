class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :followed_user_id, :follower_username 

  def follower_username 
   object.follower.username
  end 

end

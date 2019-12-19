class UserSerializer < ActiveModel::Serializer
      attributes :id, :username, :email, :bio, :avatar, :location, :my_followers, :cars, :following, :received_follows, :given_follows

  def my_followers
    object.followers.map { |follower| 
     {
       follow_id: object.received_follows.find { |follow| follow.follower_id == follower.id}.id,
       user_id: follower.id,
       username: follower.username,
       avatar: follower.avatar
     }
    }
  end

    def following 
     object.followings.map { |user|
     {
       user_id: user.id,
       username: user.username,
       avatar: user.avatar
     } }
    end 
    

end

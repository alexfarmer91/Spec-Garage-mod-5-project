class CarLikeSerializer < ActiveModel::Serializer
  attributes :id, :liker
  has_one :user
  has_one :cars

  def liker 
   liker_obj = object.user
   {:id => liker_obj.id, :username => liker_obj.username, :avatar => liker_obj.avatar}
  end 

end

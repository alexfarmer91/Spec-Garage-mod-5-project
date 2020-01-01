class CarSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model, :trim, :nickname
  has_one :user, key: :owner
  has_many :parts, serializer: PartSerializer
  has_many :photos, serializer: PhotoSerializer
  has_many :videos, serializer: VideoSerializer
  has_many :car_likes, key: :likes, serializer: CarLikeSerializer

end

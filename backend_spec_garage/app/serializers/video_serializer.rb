class VideoSerializer < ActiveModel::Serializer
  attributes :id, :youtube_link
  has_one :car
end

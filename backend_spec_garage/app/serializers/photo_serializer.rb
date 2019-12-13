class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :url, :description
  has_one :car
end

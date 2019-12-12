class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :bio, :avatar, :location
end

class PartSerializer < ActiveModel::Serializer
  attributes :id, :part_type, :brand, :version, :details, :rating
  has_one :car, key: :installed_on
end

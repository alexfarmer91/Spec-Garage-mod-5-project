class Car < ApplicationRecord
  belongs_to :user
  has_many :parts
  has_many :photos
  has_many :videos
end

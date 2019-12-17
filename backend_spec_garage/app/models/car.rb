class Car < ApplicationRecord
  belongs_to :user
  has_many :parts
  has_many :photos
  has_many :videos
  has_many :car_likes
  has_many :users, through: :car_likes
end

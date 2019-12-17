class Car < ApplicationRecord
  belongs_to :user
  has_many :parts, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :videos, dependent: :destroy
  has_many :car_likes, dependent: :destroy
  has_many :users, through: :car_likes
end

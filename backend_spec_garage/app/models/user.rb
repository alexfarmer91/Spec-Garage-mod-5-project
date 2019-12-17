class User < ApplicationRecord
    has_secure_password
    has_many :cars, dependent: :destroy
    has_many :car_likes, dependent: :destroy
    has_many :cars, through: :car_likes, as: :liked_cars
    validates :username, uniqueness: { case_sensitive: false }
    validates :email, uniqueness: true
end

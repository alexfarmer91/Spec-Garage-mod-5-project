class User < ApplicationRecord
    has_secure_password
    has_many :cars
    validates :username, uniqueness: { case_sensitive: false }
    validates :email, uniqueness: true
end

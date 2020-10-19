class User < ApplicationRecord

    has_many :games

    validates :name, :username, :password, presence: true
    validates :username, uniqueness: true

    has_secure_password
end

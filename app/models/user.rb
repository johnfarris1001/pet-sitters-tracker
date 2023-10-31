class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :pets
    has_many :appointments, through: :pets
end

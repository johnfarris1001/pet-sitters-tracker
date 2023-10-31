class Pet < ApplicationRecord
    has_many :appointments
    has_many :sitters, through: :appointments
    belongs_to :user
end
